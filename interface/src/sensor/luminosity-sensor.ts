import { Sensor } from "./sensor";
import { Point } from "@influxdata/influxdb-client";
import { parseNumber } from "../parse/parse-type";

export class LuminositySensor extends Sensor {
  name = "Luminosity";
  luminosity?: number;

  parsePayload(payload: string[]): void {
    const [luminosity] = payload;
    const luminosityNumber = parseNumber(luminosity);

    this.luminosity = luminosityNumber;
  }

  action(): string | null | undefined {
    return null;
  }

  toPoint(): Point {
    return super.toPoint().floatField("luminosity", this.luminosity);
  }
}
