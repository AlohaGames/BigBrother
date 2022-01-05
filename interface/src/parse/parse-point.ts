import sensors from "../sensor/sensors";
import { Point } from "@influxdata/influxdb-client";

export function parsePoint(data: string): Point {
  console.log(`Receive ${data}`);

  const [firstPartRaw, secondPartRaw] = data.split(";");
  const firstPart = firstPartRaw.split(",");
  const secondPart = secondPartRaw.split(",");

  const [sensor_id, room_id, type] = firstPart;

  const sensor = sensors.find((s) => s.type === type);
  if (!sensor) {
    throw new Error(`No parser for type ${type}`);
  }

  const point = new Point().tag("sensor_id", sensor_id).tag("room_id", room_id);
  return sensor.parse(point, secondPart);
}
