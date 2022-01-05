import { write } from "./database/db";
import { temperaturePoint } from "./database/point-factory";

setInterval(() => {
  // Write varying temperature every seconds
  const temperature = 24;
  write(
    temperaturePoint({
      sensor_id: "mock",
      room_id: "Le salon de Titi",
      temperature: temperature - Math.random() * 3 + Math.random() * 3,
    })
  );
}, 500);
