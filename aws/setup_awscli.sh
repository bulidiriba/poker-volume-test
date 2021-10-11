#!/bin/bash

sudo apt-get update
apt-get install -y python3-distutils
apt-get install -y python3-apt
sudo apt install -y python3-pip
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
git lfs install
export PATH=$PATH:/home/ubuntu/.local/bin
mkdir /home/ubuntu/.aws
echo '[default]' >> /home/ubuntu/.aws/config
echo 'region = us-east-1' >> /home/ubuntu/.aws/config