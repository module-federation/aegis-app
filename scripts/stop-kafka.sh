#!/bin/sh
cd ../../kafka

bin/kafka-server-stop.sh | { read message; if [ "$message" = "No kafka server to stop" ]; then echo "it's stopped"; fi }

bin/zookeeper-server-stop.sh | { read message; if [ "$message" = "No zookeeper server to stop" ]; then echo "it's stopped"; fi }

