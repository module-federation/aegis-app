#!/bin/sh

kafka/bin/kafka-topics.sh --if-not-exists --create --topic orderChannel --bootstrap-server localhost:9092

kafka/bin/kafka-topics.sh --if-not-exists --create --topic shippingChannel --bootstrap-server localhost:9092

kafka/bin/kafka-topics.sh --if-not-exists --create --topic inventoryChannel --bootstrap-server localhost:9092

kafka/bin/kafka-topics.sh --if-not-exists --create --topic broadcastChannel --bootstrap-server localhost:9092