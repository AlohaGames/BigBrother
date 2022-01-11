import { Point } from "@influxdata/influxdb-client";
import { Sensor } from "./sensor";

export class DoorSensor extends Sensor {
  name = "DoorSensor";
  card_id?: string;

  parsePayload(payload: string[]): void {
    const [card_id] = payload;
    this.card_id = card_id;
  }

  action(): string | null | undefined {
    return this.card_id;
  }

  toPoint(): Point {
    return super.toPoint().stringField("card_id", this.card_id);
  }
}
