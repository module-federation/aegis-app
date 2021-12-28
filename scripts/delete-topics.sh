#!/bin/sh

kafka/bin/kafka-topics.sh --delete --topic orderChannel --bootstrap-server localhost:9092

kafka/bin/kafka-topics.sh --delete --topic shippingChannel --bootstrap-server localhost:9092

kafka/bin/kafka-topics.sh --delete --topic inventoryChannel --bootstrap-server localhost:9092

kafka/bin/kafka-topics.sh --delete --topic broadcastChannel --bootstrap-server localhost:9092