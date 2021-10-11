# create poker directory at the top level if not exist
if [ -d "/poker"]
then
  echo "it exist"
else 
  mkdir /poker
fi

cd /poker

# check for the directory if it exist remove it
if [ -d "/poker/poker-volume-test" ]
then
   echo "the directory already exist so removing it ..."
   rm -r /poker/poker-volume-test
fi

# clone the repo
git clone https://github.com/bulidiriba/poker-volume-test.git
