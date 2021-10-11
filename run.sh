# go to the volume test repo
cd /poker/poker-volume-test

# check if the cypress docker container is running, if so stop it
CONTAINER_NAME="cypress"
if [ $( docker ps -f name=${CONTAINER_NAME} | wc -l ) -eq 2 ]; then
  echo "container already running so stopping it ..."
  docker stop ${CONTAINER_NAME}
else
  echo "container not running"
fi

# check if container found but not running, if so remove it
if [ $( docker ps -a -f name=${CONTAINER_NAME} | wc -l ) -eq 2 ]; then
  echo "container found and its stopped so removing it .."
  docker rm ${CONTAINER_NAME}
else
  echo "container not found"
fi


COMMAND='bash ./bash/signup.sh' docker-compose up --build
# save the cypress docker container logs to host server itself
timestamp=$(($(date +%s%N)/1000000))
TARGET_DIR=/poker/logs/docker_logs/$timestamp
mkdir -p "$TARGET_DIR"
path=$(docker inspect --format='{{.LogPath}}' $CONTAINER_NAME)
cp "$path" "$TARGET_DIR"/$CONTAINER_NAME.log
# copy the docker container logs file to the mereb hetnezer server
#cp "$path" mereb@138.201.198.233:/logs/
# copy the reports folder from docker container to host server itself
docker cp cypress:/app/reports /poker/reports
# copy the reports folder to mereb hetnezer server
# docker cp cypress:/app/reports mereb@138.201.198.233:/reports/

# run the commands
COMMAND='bash ./bash/login.sh' docker-compose up --build
# save the cypress docker container logs to host server itself
timestamp=$(($(date +%s%N)/1000000))
TARGET_DIR=/poker/logs/docker_logs/$timestamp
mkdir -p "$TARGET_DIR"
path=$(docker inspect --format='{{.LogPath}}' $CONTAINER_NAME)
cp "$path" "$TARGET_DIR"/$CONTAINER_NAME.log
# copy the docker container logs file to the mereb hetnezer server
#cp "$path" mereb@138.201.198.233:/logs/
# copy the reports folder from docker container to host server itself
docker cp cypress:/app/reports /poker/reports
# copy the reports folder to mereb hetnezer server
# docker cp cypress:/app/reports mereb@138.201.198.233:/reports/

COMMAND='bash ./bash/join.sh' docker-compose up --build
# save the cypress docker container logs to host server itself
timestamp=$(($(date +%s%N)/1000000))
TARGET_DIR=/poker/logs/docker_logs/$timestamp
mkdir -p "$TARGET_DIR"
path=$(docker inspect --format='{{.LogPath}}' $CONTAINER_NAME)
cp "$path" "$TARGET_DIR"/$CONTAINER_NAME.log
# copy the docker container logs file to the mereb hetnezer server
#cp "$path" mereb@138.201.198.233:/logs/
# copy the reports folder from docker container to host server itself
docker cp cypress:/app/reports /poker/reports
# copy the reports folder to mereb hetnezer server
# docker cp cypress:/app/reports mereb@138.201.198.233:/reports/

COMMAND='bash ./bash/join-any.sh' docker-compose up --build
# save the cypress docker container logs to host server itself
timestamp=$(($(date +%s%N)/1000000))
TARGET_DIR=/poker/logs/docker_logs/$timestamp
mkdir -p "$TARGET_DIR"
path=$(docker inspect --format='{{.LogPath}}' $CONTAINER_NAME)
cp "$path" "$TARGET_DIR"/$CONTAINER_NAME.log
# copy the docker container logs file to the mereb hetnezer server
#cp "$path" mereb@138.201.198.233:/logs/
# copy the reports folder from docker container to host server itself
docker cp cypress:/app/reports /poker/reports
# copy the reports folder to mereb hetnezer server
# docker cp cypress:/app/reports mereb@138.201.198.233:/reports/

COMMAND='bash ./bash/deposit.sh' docker-compose up --build
# save the cypress docker container logs to host server itself
timestamp=$(($(date +%s%N)/1000000))
TARGET_DIR=/poker/logs/docker_logs/$timestamp
mkdir -p "$TARGET_DIR"
path=$(docker inspect --format='{{.LogPath}}' $CONTAINER_NAME)
cp "$path" "$TARGET_DIR"/$CONTAINER_NAME.log
# copy the docker container logs file to the mereb hetnezer server
#cp "$path" mereb@138.201.198.233:/logs/
# copy the reports folder from docker container to host server itself
docker cp cypress:/app/reports /poker/reports
# copy the reports folder to mereb hetnezer server
# docker cp cypress:/app/reports mereb@138.201.198.233:/reports/