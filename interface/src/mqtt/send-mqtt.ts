import mqtt from "mqtt";
import { MQTT_TOPIC, MQTT_URL } from "../configuration";

const client = mqtt.connect(MQTT_URL);

export function sendMqtt(data: string) {
  client.publish(MQTT_TOPIC, data);
  console.log(`Sending to ${MQTT_TOPIC} data : ${data}`);
}
