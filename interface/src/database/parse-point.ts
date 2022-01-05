import { Point } from "@influxdata/influxdb-client";
import { temperaturePoint, luminosityPoint } from "./point-factory";
import {
  BaseMeasurement,
  LuminosityMeasurement,
  TemperatureMeasurement,
} from "../model/measurement";

export function parsePoint(data: string): Point {
  console.log(`Receive ${data}`);
  const [firstPartRaw, secondPartRaw] = data.split(";");
  const firstPart = firstPartRaw.split(",");
  const secondPart = secondPartRaw.split(",");

  const [sensor_id, room_id, type] = firstPart;

  const measurement: BaseMeasurement = {
    sensor_id,
    room_id,
  };

  if (type === "temp") {
    const temperatureMeasurement = parseTemperature(measurement, secondPart);
    return temperaturePoint(temperatureMeasurement);
  } else if (type === "light") {
    const luminosityMeasurement = parseLuminosity(measurement, secondPart);
    return luminosityPoint(luminosityMeasurement);
  } else {
    throw new Error(`No parser for type ${type}`);
  }
}

// TODO: Duplicate code
// TODO: Use something like parseNumber ?

function parseLuminosity(
  measurement: BaseMeasurement,
  secondPart: string[]
): LuminosityMeasurement {
  const [luminosity] = secondPart;

  const luminosityNumber = Number(luminosity);

  if (isNaN(luminosityNumber)) {
    throw new Error("Luminosity is not a number");
  }

  return {
    ...measurement,
    luminosity: luminosityNumber,
  };
}

function parseTemperature(
  measurement: BaseMeasurement,
  secondPart: string[]
): TemperatureMeasurement {
  const [temperature] = secondPart;

  const temperatureNumber = Number(temperature);

  if (isNaN(temperatureNumber)) {
    throw new Error("Temperature is not a number");
  }

  return {
    ...measurement,
    temperature: temperatureNumber,
  };
}
