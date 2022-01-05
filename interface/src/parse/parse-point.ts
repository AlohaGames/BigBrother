import { Point } from "@influxdata/influxdb-client";
import { Sensor } from "../model/sensor";
import sensors from "../sensor/sensors";

import {
  BaseMeasurement,
  LuminosityMeasurement,
  Measurement,
} from "../model/measurement";

export function parsePoint(data: string): Point {
  console.log(`Receive ${data}`);
  const [firstPartRaw, secondPartRaw] = data.split(";");
  const firstPart = firstPartRaw.split(",");
  const secondPart = secondPartRaw.split(",");

  const [sensor_id, room_id, type] = firstPart;

  const measurement: BaseMeasurement = {
    sensor_id,
    room_id,
  };

  const sensor = sensors.find((s) => s.type === type);

  if (!sensor) {
    throw new Error(`No parser for type ${type}`);
  }

  const sensorMeasurement = sensor.parse(measurement, secondPart);

  // TODO: Tu casses les couilles
  return sensor.toPoint(sensorMeasurement);
}
