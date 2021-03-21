#!/bin/sh

kafka/bin/kafka-server-stop.sh | { read message; if [ "$message" = "No kafka server to stop" ]; then echo "kafka stopped"; fi }

kafka/bin/zookeeper-server-stop.sh | { read message; if [ "$message" = "No zookeeper server to stop" ]; then echo "zookeeper stopped"; fi }

