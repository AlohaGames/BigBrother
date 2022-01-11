import { Point } from "@influxdata/influxdb-client";

export abstract class Sensor {
  abstract name: string;
  sensor_id?: string;
  room_id?: string;

  parseHeader(header: string[]): void {
    const [sensor_id, room_id] = header;
    this.sensor_id = sensor_id;
    this.room_id = room_id;
  }

  abstract parsePayload(payload: string[]): void;

  abstract action(): string | null | undefined;

  toPoint(): Point {
    if (!this.sensor_id || !this.room_id) {
      throw new Error(
        'No sensor_id or room_id, has the sensor been properly initialiazed in "parseHeader" ?'
      );
    }

    const point = new Point(`${this.name}Sensor`)
      .tag("sensor_id", this.sensor_id)
      .tag("room_id", this.room_id);
    return point;
  }
}
