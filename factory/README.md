# Factory

Docker files and scripts allowing us to set up fast Grafana + Telegraf + InfluxDB.

# Flux Query

https://docs.influxdata.com/influxdb/v1.8/flux/guides/

```influx
from(bucket: "telegraf")
|> range(start: -15m)
|> filter(fn: (r) =>
  r._measurement == "cpu" and
  r._field == "usage_user" and
  r.cpu == "cpu-total"
)
```
