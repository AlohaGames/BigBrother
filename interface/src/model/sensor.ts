import { Point } from "@influxdata/influxdb-client";
import { BaseMeasurement, Measurement } from "./measurement";

export interface Sensor<T extends Measurement> {
  type: string;
  parse: (measurement: BaseMeasurement, secondPart: string[]) => T;
  toPoint: (m: T) => Point;
}
