#!/bin/bash

# THIS SCRIPT CAN BE LOOPED SYNCHRONOUSLY (OR ASYNCHRONOUSLY) TO CREATE MULTIPLE TEST SERVERS
clear

timestamp() {
    date +"%s"
}

echo "Starting server setup for testing remote..."

SETUP_REGION=$1
VERSION=$2
CRON_DATE=$3 # Ex to run at 12:30am of Oct 11 of any year, should be given as "30 12 11 10 *" time zone should be in UTC

echo $VERSION

if [ -z "$2" ]
then
  VERSION="1.0"
else
  VERSION=$2
fi


echo "----------------------------"
echo "Deploying new version $VERSION environemnt..."
info=$(SETUP_REGION=$SETUP_REGION python3 src/setup_network.py)
#ISSUE HERE RETURNS ONLY THE FIRST INSTANCE - check_instance.py needs to be fixed
line=$(SETUP_REGION=$SETUP_REGION python3 src/check_instance.py)


if [ -z "$line" ]
then
      echo "No machine Created. Something went wrong"
else
  echo "LINE"
  echo "$line"
  bash -c "SETUP_REGION=$SETUP_REGION CRON_DATE=$CRON_DATE bash -x ./execute_scripts.sh $line $VERSION $info"
  echo "----------MACHINE INFO----------"
  echo "$line"
fi

