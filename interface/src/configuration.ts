import * as dotenv from "dotenv";
dotenv.config();

if (
  !process.env.INFLUX_ORG ||
  !process.env.INFLUX_BUCKET ||
  !process.env.INFLUX_URL ||
  !process.env.INFLUX_TOKEN
) {
  throw new Error("Missing configuration variable !!");
}

export const INFLUX_ORG: string = process.env.INFLUX_ORG;

export const INFLUX_BUCKET: string = process.env.INFLUX_BUCKET;

// https://docs.influxdata.com/influxdb/v2.1/reference/urls/
export const INFLUX_URL: string = process.env.INFLUX_URL;

// https://docs.influxdata.com/influxdb/cloud/security/tokens/create-token/
export const INFLUX_TOKEN: string = process.env.INFLUX_TOKEN;

export const WRITE_DATABASE: boolean =
  process.env.WRITE_DATABASE === "true" ? true : false;

export const LOG_ERROR: boolean =
  process.env.LOG_ERROR === "true" ? true : false;

export const MQTT_SEND: boolean =
  process.env.MQTT_SEND === "true" ? true : false;

export const MQTT_URL: string =
  process.env.MQTT_URL || "mqtt://test.mosquitto.org:1883";

export const MQTT_TOPIC: string =
  process.env.MQTT_TOPIC || "enssat/imr3/aloha/big-brother";
