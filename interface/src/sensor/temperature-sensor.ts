import { Point } from "@influxdata/influxdb-client";
import { BaseSensor, Sensor } from "./sensor";
import { parseNumber } from "../parse/parse-type";

export function parseTemperature(
  baseSensor: BaseSensor,
  secondPart: string[]
): TemperatureSensor {
  const [temperature] = secondPart;
  const temperatureNumber = parseNumber(temperature);

  return new TemperatureSensor(baseSensor, temperatureNumber);
}

export class TemperatureSensor extends Sensor {
  name = "TemperatureSensor";
  temperature: number;

  constructor(baseSensor: BaseSensor, temperature: number) {
    super(baseSensor);
    this.temperature = temperature;
  }

  toPoint(): Point {
    return super.toPoint().floatField("temperature", this.temperature);
  }
}
