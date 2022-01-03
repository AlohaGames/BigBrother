/*
*   This script allow us to configure the bluetooth module
*   using the AT Mode.
*
*   AT Commands :
*     AT+VERSION?   | Fourni la version du Firmware
*     AT+NAME=toto  | Change le nom du module bluetooth en "toto"
*
*   Sources :
*     https://www.instructables.com/AT-command-mode-of-HC-05-Bluetooth-module/
*     https://www.teachmemicro.com/hc-05-bluetooth-command-list/
*/

#include <SoftwareSerial.h>

// The opposite of the Arduino
// If its the same we wont receive data
#define BluetoothRxD 9
#define BluetoothTxD 8
#define BluetoothKey 12

SoftwareSerial BTSerie(BluetoothRxD, BluetoothTxD);

void setup() {
  // Init
  InitCommunicationSerie();
  InitCommunicationBluetooth();
}

void loop() {
  // Keep reading from HC-05 and log to Arduino
  if (BTSerie.available()) {
    Serial.write(BTSerie.read());    
  }

  // Keep reading from Arduino and send to HC-05
  if (Serial.available()) {
    BTSerie.write(Serial.read());
  }
}

// Init communication with computer
void InitCommunicationSerie() {
  Serial.begin(9600);    
  while (!Serial) {}
  Serial.println("Serie connection : OK");
}

// Init communication with bluetooth
void InitCommunicationBluetooth() {
  pinMode(BluetoothKey, OUTPUT);
  pinMode(BluetoothRxD, INPUT);  
  pinMode(BluetoothTxD, OUTPUT); 

  // HIGH = AT Mode
  // LOW = Normal Mode
  digitalWrite(BluetoothKey, LOW);
  
  BTSerie.begin(38400);
  while (!BTSerie) {}
  Serial.println("Bluetooth connection : OK");
}
