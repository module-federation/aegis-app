#!/bin/sh

rm -rf kafak/logs

nohup kafka/bin/zookeeper-server-start.sh kafka/config/zookeeper.properties > kafka.out &

sleep 5

nohup kafka/bin/kafka-server-start.sh kafka/config/server.properties > kafka.out &

sleep 3

kafka/bin/kafka-topics.sh --if-not-exists --create --topic orderChannel --bootstrap-server localhost:9092

kafka/bin/kafka-topics.sh --if-not-exists --create --topic shippingChannel --bootstrap-server localhost:9092

kafka/bin/kafka-topics.sh --if-not-exists --create --topic inventoryChannel --bootstrap-server localhost:9092

kafka/bin/kafka-topics.sh --if-not-exists --create --topic broadcastChannel --bootstrap-server localhost:9092
987
nohup kakfa/bin/zookeeper-server-start.sh kafka/config/zookeeper.properties > zookpr.out &

