import { Point } from "@influxdata/influxdb-client";
import { Sensor } from "./sensor";
import { parseNumber } from "../parse/parse-type";

export class SoundSensor extends Sensor {
  name = "Sound";
  sound?: number;

  parsePayload(payload: string[]): void {
    const [sound] = payload;
    const soundNumber = parseNumber(sound);

    this.sound = soundNumber;
  }

  action(): string | null | undefined {
    return null;
  }

  toPoint(): Point {
    return super.toPoint().floatField("sound", this.sound);
  }
}
