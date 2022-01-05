import { Point } from "@influxdata/influxdb-client";
import { luminositySensor } from "./luminosity-sensor";
import { temperatureSensor } from "./temperature-sensor";

export interface Sensor {
  type: string;
  parse: (point: Point, secondPart: string[]) => Point;
}

const sensors: Sensor[] = [temperatureSensor, luminositySensor];
export default sensors;
