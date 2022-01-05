import { Point } from "@influxdata/influxdb-client";
import {
  TemperatureMeasurement,
  LuminosityMeasurement,
} from "../model/measurement";

// TODO: Code duplicate ?

export function temperaturePoint(m: TemperatureMeasurement): Point {
  return new Point("heatSensor")
    .tag("sensor_id", m.sensor_id)
    .tag("room_id", m.room_id)
    .floatField("temperature", m.temperature);
}

export function luminosityPoint(m: LuminosityMeasurement): Point {
  return new Point("luminositySensor")
    .tag("sensor_id", m.sensor_id)
    .tag("room_id", m.room_id)
    .floatField("luminosity", m.luminosity);
}
