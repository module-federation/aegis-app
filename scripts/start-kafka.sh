#!/bin/sh

rm -rf kafak/logs

nohup kafka/bin/zookeeper-server-start.sh kafka/config/zookeeper.properties > kafka.out &

sleep 5

nohup kafka/bin/kafka-server-start.sh kafka/config/server.properties > kafka.out &

sleep 5