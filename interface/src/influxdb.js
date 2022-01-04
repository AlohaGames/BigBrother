const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const INFLUX_ORG = "aloha";
const INFLUX_BUCKET = "big-brother";

// https://docs.influxdata.com/influxdb/v2.1/reference/urls/
const INFLUX_URL = "http://192.168.33.10:8086";

// https://docs.influxdata.com/influxdb/cloud/security/tokens/create-token/
const INFLUX_TOKEN = "INFLUXDB_TOKEN";

const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });

function write(temperature) {
  const writeApi = influxDB.getWriteApi(INFLUX_ORG, INFLUX_BUCKET);

  const point = new Point("heatSensor")
    .tag("sensor_id", "TLM010")
    .floatField("temperature", temperature);

  writeApi.writePoint(point);

  writeApi.close().then(() => {
    console.log("WRITE FINISHED");
  });
}

// https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/nodejs/query/
function query() {
  // InfluxDB Query
  const queryApi = new InfluxDB({ INFLUX_URL, INFLUX_TOKEN }).getQueryApi(
    INFLUX_ORG
  );

  const fluxQuery = `from(bucket: "${INFLUX_BUCKET}") |> range(start: 0) |> filter(fn: (r) => r._measurement == "temperature")`;

  const observer = {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      console.log(o);
    },
    error(err) {
      console.log(err);
    },
    complete() {
      console.log("Completed !");
    },
  };

  queryApi.queryRows(fluxQuery, observer);
}

module.exports = { write, query };
