import { Sensor } from "./sensors";
import { Point } from "@influxdata/influxdb-client";
import { parseNumber } from "../parse/parse-type";

function parse(point: Point, secondPart: string[]): Point {
  const [luminosity] = secondPart;
  const luminosityNumber = parseNumber(luminosity);

  return point
    .measurement("luminositySensor")
    .floatField("luminosity", luminosityNumber);
}

export const luminositySensor: Sensor = {
  type: "lux",
  parse,
};
