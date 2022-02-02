import { Point } from "@influxdata/influxdb-client";
import { parseBoolean } from "../parse/parse-type";
import { Sensor } from "./sensor";

export class DoorSensor extends Sensor {
  name = "Door";
  card_id?: string;
  permission?: boolean;

  parsePayload(payload: string[]): void {
    const [card_id, permission] = payload;
    this.card_id = card_id;
    this.permission = parseBoolean(permission);
  }

  action(): string | null | undefined {
    return this.card_id;
  }

  toPoint(): Point {
    return super
      .toPoint()
      .stringField("card_id", this.card_id)
      .booleanField("permission", this.permission);
  }
}
