const { write } = require("./influxdb");

setInterval(() => {
  // Write varying temperature every seconds
  const temperature = 24;
  write(temperature - Math.random() * 3 + Math.random() * 3);
}, 500);
