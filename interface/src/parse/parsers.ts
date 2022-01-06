import { BaseSensor, Sensor } from "../sensor/sensor";
import { parseTemperature } from "../sensor/temperature-sensor";
import { parseLuminosity } from "../sensor/luminosity-sensor";
import { parseNfs } from "../sensor/nfc-sensor";

type Parser = (baseSensor: BaseSensor, secondPart: string[]) => Sensor;

const parsers = new Map<string, Parser>();
parsers.set("temp", parseTemperature);
parsers.set("lux", parseLuminosity);
parsers.set("nfs", parseNfs);
export default parsers;
