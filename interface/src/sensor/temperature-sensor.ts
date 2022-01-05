import { Point } from "@influxdata/influxdb-client";
import { Sensor } from "../model/sensor";
import { basePoint } from "../database/point-factory";
import { parseNumber } from "../parse/parse-type";
import { BaseMeasurement, TemperatureMeasurement } from "../model/measurement";

function parse(
  measurement: BaseMeasurement,
  secondPart: string[]
): TemperatureMeasurement {
  const [temperature] = secondPart;
  const temperatureNumber = parseNumber(temperature);

  return {
    ...measurement,
    temperature: temperatureNumber,
  };
}

function toPoint(m: TemperatureMeasurement): Point {
  return basePoint(m)
    .measurement("heatSensor")
    .floatField("temperature", m.temperature);
}

export const temperatureSensor: Sensor<TemperatureMeasurement> = {
  type: "temp",
  parse,
  toPoint,
};
