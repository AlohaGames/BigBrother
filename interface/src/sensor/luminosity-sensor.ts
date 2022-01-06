import { Point } from "@influxdata/influxdb-client";
import { BaseSensor, Sensor } from "./sensor";
import { parseNumber } from "../parse/parse-type";

export function parseLuminosity(
  baseSensor: BaseSensor,
  secondPart: string[]
): LuminositySensor {
  const [luminosity] = secondPart;
  const luminosityNumber = parseNumber(luminosity);

  return new LuminositySensor(baseSensor, luminosityNumber);
}

export class LuminositySensor extends Sensor {
  name = "luminositySensor";
  luminosity: number;

  constructor(baseSensor: BaseSensor, luminosity: number) {
    super(baseSensor);
    this.luminosity = luminosity;
  }

  toPoint(): Point {
    return super.toPoint().floatField("luminosity", this.luminosity);
  }
}
