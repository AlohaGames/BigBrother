import { Point } from "@influxdata/influxdb-client";

export interface BaseSensor {
  sensor_id: string;
  room_id: string;
}

export abstract class Sensor {
  abstract name: string;
  sensor_id: string;
  room_id: string;

  constructor(baseSensor: BaseSensor) {
    this.sensor_id = baseSensor.sensor_id;
    this.room_id = baseSensor.room_id;
  }

  toPoint(): Point {
    return new Point()
      .tag("sensor_id", this.sensor_id)
      .tag("room_id", this.room_id)
      .measurement(this.name);
  }
}
