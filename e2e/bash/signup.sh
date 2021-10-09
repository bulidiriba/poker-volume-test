#!/bin/bash

echo "Bash version ${BASH_VERSION}..."
timestamp=$(($(date +%s%N)/1000000))
     
for i in {1..2}
  do
      # generate random username with prefix 'user-' and random 3 digits 
      digits=3
      a=$(date +%s)
      b=$((a*RANDOM))
      while [ ${#b} -lt 3 ]; do
          b="${b}$RANDOM"
      done
      
      randUser="${b:0:digits}"

      # generate random social security number of 9 digits 
      digits=9
      a=$(date +%s)
      b=$((a*RANDOM))
      while [ ${#b} -lt 9 ]; do
          b="${b}$RANDOM"
      done

      randSsn="${b:0:digits}"

     username="user$randUser"
     email="user$randUser@user$randUser.com"
     phone=0000000000

     export CYPRESS_videosFolder="reports/videos/$timestamp/$i"
     export CYPRESS_screenshotsFolder="reports/screenshots/$timestamp"

     cypress run --spec=./cypress/integration/signup/signup.spec.js --headless --browser electron --env username=$username,email=$email,phone=$phone,ssn=$randSsn &
 done

  wait