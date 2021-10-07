# Cypress Volume Tests

## To Run
1. Install Cypress Globally

    `npm install -g cypress`  

2. Edit the baseUrl in cypress.json

    currently its setted to aws instance `https://qa5848de7-web.rgtests.com`

    Note make sure that there is no / at the end.

3. There is two way to run 

    3.1 With bash
    
    3.2 With python

3. Make sure that `python3` is available on your machine

4. Go to `automation_test/e2e` folder

    `cd automation-test/e2e`

5. Run the python or bash script

    `python3 run.py`  
    
    ------OR-----

    `bash ./bash/login.sh`


## To run with docker

1. ### Build and Run
   
    `COMMAND=<command> docker-compose up  --build`
    
    COMMAND is the command which is going to be run with docker-compose. In our case it may be `bash` command with `bash file path` or `python3` command with `python file path`

    Currently the following functionality can be tested

    With `bash`

        COMMAND='bash ./bash/login.sh' docker-compose up --build
        COMMAND='bash ./bash/signup.sh' docker-compose up --build
        COMMAND='bash ./bash/join.sh' docker-compose up --build
        COMMAND='bash ./bash/join-any.sh' docker-compose up --build
        COMMAND='bash ./bash/deposit.sh' docker-compose up --build

    With `python3`

        COMMAND='python3 run.py' docker-compose up --build
    
    Note 
    
    1. don't forget to add qoutation(') for the command since there is space in between the command and file path

    2. If your docker doesn't accessed without `sudo` just add `sudo` infront of `COMMAND` 

    e.g   

        sudo COMMAND='bash ./bash/login.sh' docker-compose up --build

2. ### Configuration Files 

    The cypress test configuration file is found in `three` file

    1. cypress.json

        In this file there are configuration to be configured like
        - changing `baseUrl` (Note: make sure that there is no / at the end)
        - weather to record video or not

    2. helpers/constants.js

        In this file there are configuration like
        - setting `game_name`
        - setting `admin email` and `password`
        - setting `test card number` and `test expiration date` 
        - setting `deposit amount`

    3. In respective `bash file` 
        - changing number of bots that can be run parallelly
        - setting `screenshots` and `video` folder
        

        For `signup` all of the other information is also setted and can be changed here in the `signup bash file`

3. ### To copy the reports folder to host

    `docker cp <cont-id>:/app/reports $HOME/reports`

