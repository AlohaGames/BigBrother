import { InfluxDB, Point } from "@influxdata/influxdb-client";

import {
  INFLUX_URL,
  INFLUX_TOKEN,
  INFLUX_BUCKET,
  INFLUX_ORG,
} from "../configuration";

const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });

export function write(point: Point) {
  const writeApi = influxDB.getWriteApi(INFLUX_ORG, INFLUX_BUCKET);

  writeApi.writePoint(point);

  writeApi.close().then(() => {
    console.log("Write finish");
  });
}
