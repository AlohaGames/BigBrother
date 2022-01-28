import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

if (
  !process.env.INFLUX_ORG ||
  !process.env.INFLUX_BUCKET ||
  !process.env.INFLUX_URL ||
  !process.env.INFLUX_TOKEN
) {
  throw new Error("Missing configuration variable !!");
}

export const INFLUX_ORG: string = process.env.INFLUX_ORG;

export const INFLUX_BUCKET: string = process.env.INFLUX_BUCKET;

// https://docs.influxdata.com/influxdb/v2.1/reference/urls/
export const INFLUX_URL: string = process.env.INFLUX_URL;

// https://docs.influxdata.com/influxdb/cloud/security/tokens/create-token/
export const INFLUX_TOKEN: string = process.env.INFLUX_TOKEN;
