
# get_instance_short_id
str=$1
shortid=${str:0:7}

#setup_docker
ssh -i out/$1.pem ubuntu@$2 'sudo bash -s' < ./setup_docker.sh
rsync -avz -e "ssh -i out/$1.pem" docker.service ubuntu@$2:/home/ubuntu/docker.service
ssh -i out/$1.pem ubuntu@$2 'sudo mv /home/ubuntu/docker.service /lib/systemd/system/docker.service'
ssh -i out/$1.pem ubuntu@$2 'sudo systemctl daemon-reload'
ssh -i out/$1.pem ubuntu@$2 'sudo systemctl restart docker.service'

#setup_awscli
ssh -i out/$1.pem ubuntu@$2 'curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"'
ssh -i out/$1.pem ubuntu@$2 'sudo apt -y install unzip'
ssh -i out/$1.pem ubuntu@$2 'unzip awscli-bundle.zip'
ssh -i out/$1.pem ubuntu@$2 'sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws'
ssh -i out/$1.pem ubuntu@$2 'sudo mkdir /poker'
ssh -i out/$1.pem ubuntu@$2 'sudo chown ubuntu:ubuntu /poker'
ssh -i out/$1.pem ubuntu@$2 'sudo bash -s' < ./setup_awscli.sh

#clone the repo
ssh -i out/$1.pem ubuntu@$2 'sudo bash -s' < ./clone_repo.sh

#configure the crontab file
echo "----------------------------------"
echo "Create the crontab config file with the provided Date of $CRON_DATE and file to be executed from cloned repo"
# get the run_test.sh that is going to be executed with crontab from the cloned repo
echo $CRON_DATE "/poker/poker-volume-test/run.sh" > /poker/cron.txt

# set the cron job scheduler with crontab and configured file
crontab /poker/cron.txt