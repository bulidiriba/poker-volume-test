#!/bin/bash

echo "Bash version ${BASH_VERSION}..."
timestamp=$(($(date +%s%N)/1000000))
email=test9
password=user.password

export CYPRESS_videosFolder="reports/videos/$timestamp/$email"
export CYPRESS_screenshotsFolder="reports/screenshots/$timestamp"
cypress run --spec=./cypress/integration/tournament_template/launch.spec.js --headless --browser electron --env email=$email,password=$password