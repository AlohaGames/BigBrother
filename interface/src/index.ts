import SerialPort from "serialport";
import { write } from "./database/db";
import { parsePoint } from "./parse/parse-point";

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
    try {
      const point = parsePoint(data);
      write(point);
    } catch (err) {
      console.log(err);
    }
  });
}

main();
