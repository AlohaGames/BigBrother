export type Measurement = TemperatureMeasurement | LuminosityMeasurement;

export interface BaseMeasurement {
  sensor_id: string;
  room_id: string;
}

export interface TemperatureMeasurement extends BaseMeasurement {
  temperature: number;
}

export interface LuminosityMeasurement extends BaseMeasurement {
  luminosity: number;
}
