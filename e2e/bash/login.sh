#!/bin/bash

echo "Bash version ${BASH_VERSION}..."
timestamp=$(($(date +%s%N)/1000000))
     
for i in {41..100}
  do
     echo "starting cypress: bot$i"
     export CYPRESS_videosFolder="reports/videos/$timestamp/bot$i"
     export CYPRESS_screenshotsFolder="reports/screenshots/$timestamp"
     cypress run --spec=./cypress/integration/login/login.spec.js --headless --browser electron --env email=bot$i,password=user.password &
 done

  while :; do :; done & kill -STOP $! && wait $!