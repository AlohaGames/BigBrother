import { Point } from "@influxdata/influxdb-client";
import parsers from "./parsers";

export function parsePoint(data: string): Point {
  console.log(`Receive ${data}`);

  const [firstPartRaw, secondPartRaw] = data.split(";");
  const firstPart = firstPartRaw.split(",");
  const secondPart = secondPartRaw.split(",");

  const [sensor_id, room_id, type] = firstPart;

  const parser = parsers.get(type);

  if (!parser) {
    throw new Error("No parser found for this type of data");
  }

  const sensor = parser({ sensor_id, room_id }, secondPart);
  return sensor.toPoint();
}
