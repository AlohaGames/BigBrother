import SerialPort from "serialport";
import { LOG_ERROR, WRITE_DATABASE } from "./configuration";
import { write } from "./database/db";
import { parseSensor } from "./parse/parse-sensor";

async function main() {
  // Get list of ports
  const ports = await SerialPort.list();

  // Filter only Arduino ones
  const arduinoPorts = ports.filter(
    (p) => p.manufacturer && p.manufacturer.includes("Arduino")
  );

  if (arduinoPorts.length <= 0) {
    throw new Error("No Arduino ports found !");
  }

  console.log(`Found ${arduinoPorts.length} Arduino ports`);

  // Init Serial
  const arduinoPort = arduinoPorts[0];
  console.log(`Using ${arduinoPort.manufacturer} on ${arduinoPort.path}`);
  const serialport = new SerialPort(arduinoPort.path, {
    baudRate: 9600,
  });

  serialport.on("open", () => {
    console.log("Connection with Arduino open !");
  });

  serialport.on("close", () => {
    console.log("Connection with Arduino closed !");
  });

  serialport.on("error", (err) => {
    throw err;
  });

  // Use ReadLine parser to parse line by line using \n as delimiter
  const parser = serialport.pipe(
    new SerialPort.parsers.Readline({ delimiter: "\n", encoding: "utf8" })
  );

  parser.on("data", (data: string) => {
    console.log(`Receive ${data}`);

    try {
      // Exemple : hello,S002,R001;world
      const dataRegExp = new RegExp(/[a-z]*,S[0-9]*,R[0-9]*;.*/);

      if (!data.match(dataRegExp)) {
        throw new Error(`Data does not match format ${dataRegExp}`);
      }

      // Remove line breaks (some troubles with Enora)
      const dataCleaned = data.replace(/\r/g, "");

      // Parse sensor based on received data
      const sensor = parseSensor(dataCleaned);

      // Compute action and get response data
      const response = sensor.action();

      // Write point to database
      if (WRITE_DATABASE) {
        write(sensor.toPoint());
      }

      // Send response back to arduino device
      if (response) {
        serialport.write(response);
      }
    } catch (err) {
      if (LOG_ERROR) {
        console.log(err);
      }
    }
  });
}

main();
