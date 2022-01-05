import { Point } from "@influxdata/influxdb-client";
import { Measurement } from "../model/measurement";

export function basePoint(m: Measurement): Point {
  return new Point().tag("sensor_id", m.sensor_id).tag("room_id", m.room_id);
}
