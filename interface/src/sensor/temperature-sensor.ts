import { Sensor } from "./sensors";
import { Point } from "@influxdata/influxdb-client";
import { parseNumber } from "../parse/parse-type";

function parse(point: Point, secondPart: string[]): Point {
  const [temperature] = secondPart;
  const temperatureNumber = parseNumber(temperature);

  return point
    .measurement("heatSensor")
    .floatField("temperature", temperatureNumber);
}

export const temperatureSensor: Sensor = {
  type: "temp",
  parse,
};
