# Factory

Docker files and scripts allowing us to set up fast Grafana + Telegraf + InfluxDB.

# Flux Query

https://docs.influxdata.com/influxdb/v1.8/flux/guides/

```influx
from(bucket: "big-brother")
|> range(start: -1h)
|> filter(fn: (r) =>
  r._measurement == "TemperatureSensor"
)
```
