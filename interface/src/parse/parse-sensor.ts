import { Sensor } from "../sensor/sensor";
import { DoorSensor } from "../sensor/door-sensor";
import { LuminositySensor } from "../sensor/luminosity-sensor";
import { TemperatureSensor } from "../sensor/temperature-sensor";

export function parseSensor(data: string): Sensor {
  const [firstPartRaw, secondPartRaw] = data.split(";");

  const firstPart = firstPartRaw.split(",");
  const secondPart = secondPartRaw.split(",");
  const type = firstPart.shift();

  if (!type) {
    throw new Error(`No type defined for sensor`);
  }

  const sensor = sensorFactory(type);

  if (!sensor) {
    throw new Error(`No parser for type ${type}`);
  }

  sensor.parseHeader(firstPart);
  sensor.parsePayload(secondPart);
  return sensor;
}

function sensorFactory(type: string) {
  switch (type) {
    case "door":
      return new DoorSensor();
    case "lux":
      return new LuminositySensor();
    case "temp":
      return new TemperatureSensor();
  }
}
