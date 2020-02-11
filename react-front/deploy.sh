#!/bin/bash

cd /home/ubuntu/react-travis

echo "> 현재 실행중인 애플리케이션 pid 확인 "
CURRENT_PID=$(pgrep -f start.js)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
  echo "> kill -15 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi


sudo cp /home/ubuntu/server.pem ./node_modules/webpack-dev-server/ssl

sudo cp /home/ubuntu/webpackDevServer.config.js ./node_modules/react-scripts/config

yarn start