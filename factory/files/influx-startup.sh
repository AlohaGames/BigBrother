#!/bin/bash

# Commands to set up influxdb and create 
# A primary bucket to receive or IoT data
# A bucket to receive telegraf data

# If it does not work due to bad interpreter :
# sed -i -e 's/\r$//'

influx setup -u tristan -p aBcJ45f5 -o aloha -b big-brother -r 0 -f

influx auth create -o aloha --all-access

influx bucket create -n telegraf -o aloha -r 0 
