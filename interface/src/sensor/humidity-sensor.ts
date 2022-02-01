import { Sensor } from "./sensor";
import { Point } from "@influxdata/influxdb-client";
import { parseNumber } from "../parse/parse-type";

export class HumiditySensor extends Sensor {
  name = "Humidity";
  humidity?: number;

  parsePayload(payload: string[]): void {
    const [humidity] = payload;
    const humidityNumber = parseNumber(humidity);

    this.humidity = humidityNumber;
  }

  action(): string | null | undefined {
    return null;
  }

  toPoint(): Point {
    return super.toPoint().floatField("humidity", this.humidity);
  }
}
