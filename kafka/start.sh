#!/bin/sh

nohup bin/zookeeper-server-start.sh  config/zookeeper.properties &

sleep 5

nohup bin/kafka-server-start.sh config/server.properties &

sleep 3

bin/kafka-topics.sh --if-not-exists --create --topic orderChannel --bootstrap-server localhost:9092

bin/kafka-topics.sh --if-not-exists --create --topic shippingChannel --bootstrap-server localhost:9092

bin/kafka-topics.sh --if-not-exists --create --topic inventoryChannel --bootstrap-server localhost:9092



