import { Point } from "@influxdata/influxdb-client";
import { BaseSensor, Sensor } from "./sensor";

export function parseNfs(
  baseSensor: BaseSensor,
  secondPart: string[]
): NfcSensor {
  const [person_id] = secondPart;

  return new NfcSensor(baseSensor, person_id);
}

export class NfcSensor extends Sensor {
  name = "NfcSensor";
  person_id: string;

  constructor(baseSensor: BaseSensor, person_id: string) {
    super(baseSensor);
    this.person_id = person_id;
  }

  toPoint(): Point {
    return super.toPoint().stringField("person", this.person_id);
  }
}
