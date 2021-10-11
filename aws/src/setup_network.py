import boto3
import datetime
import os
import uuid

timestamp = str(uuid.uuid4())

def create_keypair():
  setup_region = os.environ.get('SETUP_REGION')
  dry_run = False
  key_name = timestamp
  key_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"../out/{key_name}.pem")
  fp_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"../out/{key_name}.print")
  ec2 = boto3.client('ec2', region_name=setup_region)

  key = ec2.create_key_pair(KeyName=key_name, DryRun=dry_run)
  with open(key_path, 'w') as file:
    file.write(key['KeyMaterial'])
  with open(fp_path, 'w') as file:
    file.write(key['KeyFingerprint'])
  return key

def create_vpc():
  setup_region = os.environ.get('SETUP_REGION')
  ec2_res = boto3.resource('ec2', region_name=setup_region)
  vpc = ec2_res.create_vpc(CidrBlock='10.0.0.0/16')
  vpc.create_tags(Tags=[{"Key": "ts", "Value": timestamp}])
  vpc.wait_until_available()
  ec2_client = boto3.client('ec2', region_name=setup_region)
  ec2_client.modify_vpc_attribute( VpcId = vpc.id , EnableDnsSupport = { 'Value': True } )
  ec2_client.modify_vpc_attribute( VpcId = vpc.id , EnableDnsHostnames = { 'Value': True } )
  return vpc

def create_internet_gateway(vpc):
  # create an internet gateway and attach it to VPC
  setup_region = os.environ.get('SETUP_REGION')
  ec2_res = boto3.resource('ec2', region_name=setup_region)
  internetgateway = ec2_res.create_internet_gateway()
  vpc.attach_internet_gateway(InternetGatewayId=internetgateway.id)
  return internetgateway

def create_route_table(vpc, ig):
  for route_table in vpc.route_tables.all():  # There should only be one route table to start with
      route_table.create_route(DestinationCidrBlock='0.0.0.0/0', GatewayId=ig.id
  )

def create_subnet(vpc):
  setup_region = os.environ.get('SETUP_REGION')
  ec2_res = boto3.resource('ec2', region_name=setup_region)
  subnet = ec2_res.create_subnet(CidrBlock='10.0.0.0/24', VpcId=vpc.id)
  return subnet

def create_security_group(vpc):
  setup_region = os.environ.get('SETUP_REGION')
  ec2_res = boto3.resource('ec2', region_name=setup_region)
  sec_group = ec2_res.create_security_group(
      GroupName='slice_0', Description='slice_0 sec group', VpcId=vpc.id
  )
  os.environ['SECURITY_GROUP_ID'] = sec_group.id
  sec_group.authorize_ingress(
      CidrIp='0.0.0.0/0',
      IpProtocol="icmp",
      FromPort=-1,
      ToPort=-1
  )
  sec_group.authorize_ingress(
      CidrIp='0.0.0.0/0',
      IpProtocol='tcp',
      FromPort=22,
      ToPort=22
  )

  return sec_group

def create_instance(subnet, sec_group):
  setup_region = os.environ.get('SETUP_REGION')
  ec2_res = boto3.resource('ec2', region_name=setup_region)
  user_data = '''#!/bin/bash -x
IDX=1
for DEV in /dev/disk/by-id/nvme-Amazon_EC2_NVMe_Instance_Storage_*; do
  mkfs.xfs ${DEV}
  mkdir -p /local${IDX}
  echo ${DEV} /local${IDX} xfs defaults,noatime 1 2 >> /etc/fstab
  IDX=$((${IDX} + 1))
done
mount -a
'''
  image_dict = {
    "cn-north-1": "ami-0071f6f4df15863cc",
    "eu-west-2": "ami-0ed2df11a6d41ea78",
    "us-west-2": "ami-0e23ea41be77feacd",
    "us-west-1": "ami-0777d8c544fb25aec",
    "us-east-1": "ami-0a4f4704a9146742a",
    "us-east-2": "ami-004d3abe7e5109c79",
    "ca-central-1": "ami-065ba2b6b298ed80f"
  }
  assert image_dict[setup_region], "no image for region"
  instances = ec2_res.create_instances(
      ImageId=image_dict[setup_region],
      BlockDeviceMappings=[
        {
            'DeviceName': '/dev/sda1',
            'Ebs': {
                'DeleteOnTermination': True,
                'VolumeSize': 150,
            },
        },
      ],
      InstanceType='m5d.xlarge',
      KeyName=timestamp,
      MaxCount=1, 
      MinCount=1,
      NetworkInterfaces=[{'SubnetId': subnet.id, 'DeviceIndex': 0, 'AssociatePublicIpAddress': True, 'Groups': [sec_group.group_id]}],
      UserData=user_data
  )
  instances[0].wait_until_running()
  ec2_res.create_tags(Resources=[instances[0].id], Tags=[{'Key':'Name', 'Value':timestamp},{'Key':'ServerRole', 'Value':'Deploy'}])
  return instances[0]

if __name__ == '__main__':
  setup_region = os.environ.get('SETUP_REGION')
  assert setup_region, "NO Region"
  ec2_res = boto3.resource('ec2', region_name=setup_region)
  key = create_keypair()
  vpc = create_vpc()
  ig = create_internet_gateway(vpc)
  rt = create_route_table(vpc, ig)
  subnet = create_subnet(vpc)
  sec_group = create_security_group(vpc)
  instance = create_instance(subnet, sec_group)
  #instance info
  # Get information for all running instances
  running_instances = ec2_res.instances.filter(Filters=[{
    'Name': 'instance-state-name',
    'Values': ['running']}
  ])

  print(vpc.vpc_id, ig.internet_gateway_id, subnet.subnet_id, sec_group.group_id)
