import { Point } from "@influxdata/influxdb-client";
import { Sensor } from "../model/sensor";
import { basePoint } from "../database/point-factory";
import { parseNumber } from "../parse/parse-type";
import { BaseMeasurement, LuminosityMeasurement } from "../model/measurement";

function parse(
  measurement: BaseMeasurement,
  secondPart: string[]
): LuminosityMeasurement {
  const [luminosity] = secondPart;
  const luminosityNumber = parseNumber(luminosity);
  return {
    ...measurement,
    luminosity: luminosityNumber,
  };
}

function toPoint(m: LuminosityMeasurement): Point {
  return basePoint(m)
    .measurement("luminositySensor")
    .floatField("luminosity", m.luminosity);
}

export const luminositySensor: Sensor<LuminosityMeasurement> = {
  type: "lux",
  parse,
  toPoint,
};
