import boto3
import datetime
import os
from pprint import pprint 

timestamp = str(datetime.datetime.now().timestamp())
setup_region = os.environ.get('SETUP_REGION')
assert setup_region, "NO Region"
ec2 = boto3.resource('ec2', region_name=setup_region)
if __name__ == '__main__':
  # Boto 3
  # Use the filter() method of the instances collection to retrieve
  # all running EC2 instances.
  instances = ec2.instances.filter(
      Filters=[{'Name': 'instance-state-name', 'Values': ['running']}])
  for instance in instances:
      tags = instance.tags or []
      names = [tag.get('Value') for tag in tags if tag.get('Key') == 'Name']
      name = names[0] if names else None
      print(name, instance.public_ip_address, instance.id, setup_region)
