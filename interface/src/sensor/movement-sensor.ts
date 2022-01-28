import { Sensor } from "./sensor";
import { Point } from "@influxdata/influxdb-client";
import { parseBoolean } from "../parse/parse-type";

export class MovementSensor extends Sensor {
  name = "MovementSensor";
  movement?: boolean;

  parsePayload(payload: string[]): void {
    const [movement] = payload;
    const movementBoolean = parseBoolean(movement);

    this.movement = movementBoolean;
  }

  action(): string | null | undefined {
    return null;
  }

  toPoint(): Point {
    return super.toPoint().booleanField("movement", this.movement);
  }
}
