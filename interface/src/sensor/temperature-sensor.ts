import { Sensor } from "./sensor";
import { Point } from "@influxdata/influxdb-client";
import { parseNumber } from "../parse/parse-type";

export class TemperatureSensor extends Sensor {
  name = "Temperature";
  temperature?: number;

  parsePayload(payload: string[]): void {
    const [temperature] = payload;
    const temperatureNumber = parseNumber(temperature);

    this.temperature = temperatureNumber;
  }

  action(): string | null | undefined {
    return null;
  }

  toPoint(): Point {
    return super.toPoint().floatField("temperature", this.temperature);
  }
}
