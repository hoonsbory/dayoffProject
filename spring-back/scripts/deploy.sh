#!/bin/bash



export GOOGLE_APPLICATION_CREDENTIALS=/home/ubuntu/strong-kit-252505-3da4b777b59f.json

echo "> 현재 실행중인 애플리케이션 pid 확인"
CURRENT_PID=$(pgrep -f dayoff-0.0.1-SNAPSHOT.jar)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
  echo "> kill -15 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

echo "> jar 배포"

cd /home/ubuntu/build

nohup java -jar dayoff-0.0.1-SNAPSHOT.jar > /dev/null 2>&1 &



