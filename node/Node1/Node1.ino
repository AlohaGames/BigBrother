/*
 * Created by Aloha Corp
 */

// Librairies
#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>
#include <LiquidCrystal_I2C.h>
#include <dht11.h>

// Definition of the room
#define ID_CARTE "S1"
#define ROOM "R1"

// Definition of pins
#define RFID_RST_PIN      5     // RFID RST pin - check above documentation for more details
#define LIGHTS_PIN        7     // Led pin
#define PRES_PIN          14    // HC-S501 Presence Sensor
#define DOOR_PIN          15    // Servo motor
#define DHT_PIN           16    // DHT11 Temperature and Humidity sensor
#define RFID_SS_PIN       53    // RFID SS pin - check above documentation for more details
#define PHOTORES_PIN      A0    // Photoresistor
#define SOUND_PIN         A1    // Soundsound sensor

// Door - Servo motor
#define CLOSE_ROTATION    0     // Rotation for servo to close the door
#define OPEN_ROTATION     90    // Rotation for servo to open the door
#define DOOR_DURATION     5000  // Duration the door will be open
Servo door;
bool isDoorOpen;
unsigned long opened_door_timestamp;

// Lights
#define LIGHTS_DURATION   3000 // Duration the lights will be on
bool isLightsOn;
unsigned long lights_on_timestamp;

// RFID
MFRC522 mfrc522(RFID_SS_PIN, RFID_RST_PIN);   // Create MFRC522 instance
MFRC522::MIFARE_Key key;
String acceptedUsers[] = {
  "43 9B 72 0C",
  "59 15 C5 B2"
};

// LCD
LiquidCrystal_I2C lcd(0x27,16,2);

void setup() {
  Serial.begin(9600);

  // RFID
  SPI.begin();         // Init SPI bus
  mfrc522.PCD_Init();  // Init MFRC522 card

  // Set pins
  pinMode(LIGHTS_PIN, OUTPUT);  // Set lights to output
  pinMode(PRES_PIN, INPUT);     // Set presence sensor to input
  pinMode(PHOTORES_PIN, INPUT); // Set photoresistance to input
  pinMode(SOUND_PIN, INPUT);    // Set sound sensor to input
  pinMode(DHT_PIN, INPUT);      // Set humidity and temperature sensor to input
  door.attach(DOOR_PIN);        // Set door pin

  // LCD
  lcd.init();
  lcd.backlight();

  // Init variables
  door.write(CLOSE_ROTATION);
  digitalWrite(LIGHTS_PIN, LOW);
  isDoorOpen = false;
  isLightsOn = false;
  
  // Prepare key - all keys are set to FFFFFFFFFFFF at chip delivery from the factory.
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
}

void loop() {  
  // PIR Sensor
  int presenceValue = getPresenceSensorValue();
  sendMove(presenceValue);
  if (presenceValue == 1) {
    switchOnLights();
  }

  // Temperature and humidity sensor
  dht11 DHT = getDHTValues();
  sendTemperature((float)DHT.temperature);
  sendHumidity((float)DHT.humidity);
  
  // Luminosity
  sendLuminosity(getLuminosityValue());

  // Sound
  sendSound(getSoundSensorValue());

  // RFID
  String UID = getRFIDUID();
  if (UID != String("")) {
    sendCardUID(UID);
    
    // Servo
    if (isUserAccepted(UID)) {
      openDoor();
      lcd.setCursor(1,0);
      lcd.print("Acces autorise");
    }else{
      lcd.setCursor(2,0);
      lcd.print("Acces refuse");
    }
  }

  closeDoor();
  switchOffLights();

  // Add delay
  delay(3000);
}

bool getPresenceSensorValue() {
  int presenceValue = digitalRead(PRES_PIN); // Get presence sensor's value
  return presenceValue;
}

int getLuminosityValue() {
  int lumiValue = analogRead(PHOTORES_PIN); // Get presence sensor's value
  return lumiValue;
}

int getSoundSensorValue() {
  int soundValue = analogRead(SOUND_PIN); // Get presence sensor's value
  return soundValue;
}

dht11 getDHTValues()
{
  dht11 DHT11;
  DHT11.read(DHT_PIN);
  return DHT11;
}

String getRFIDUID() {
  // Look for new cards, and select one if present
  if ( ! mfrc522.PICC_IsNewCardPresent() || ! mfrc522.PICC_ReadCardSerial() ) {
    delay(50);
    return "";
  }
  
  // Dump UID
  String content= "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  } 
  content.toUpperCase();
  content.trim();
  
  return content;
}

bool isUserAccepted(String UID) {

  // Get number of authorized users
  int acceptedUsersLength = sizeof(acceptedUsers) / sizeof(String);

  // Check if the user is an authorized user in the list
  for (int i = 0; i < acceptedUsersLength; i++ ) {
    if (UID == acceptedUsers[i]) {
      Serial.println("User ["+UID+"] is accepted");
      return true;
    }
  }

  // if the user is not an authorized user
  Serial.println("The card ["+UID+"] is not an authorized user");
  return false;
}

void openDoor() {
  // If the door is closed, open the door
  if (isDoorOpen == false) {
    Serial.println("Opening the door");
    isDoorOpen = true;
    door.write(OPEN_ROTATION);
  }
  
  // Reset timestamp if the card is still detected while the door is opened
  opened_door_timestamp = millis();
}

void closeDoor() {
  // If the door is opened and 5 seconds pass since last detection, close the door
  if (isDoorOpen == true) {
    if( millis() - opened_door_timestamp > DOOR_DURATION ) {
      Serial.println("Closing the door");
      door.write(CLOSE_ROTATION);
      isDoorOpen = false; 
    }
  }
}

void switchOnLights() {
  // If the lights are off, switch on the lights
  if (isLightsOn == false) {
    Serial.println("Switch on the lights");
    isLightsOn = true;
    digitalWrite(LIGHTS_PIN, isLightsOn);
  }
  
  // Reset timestamp if the card is still detected while the door is opened
  lights_on_timestamp = millis();
}

void switchOffLights() {
  // If the lights are on and 20 seconds pass since last detection, switch off the lights
  if (isLightsOn == true) {
    if( millis() - lights_on_timestamp > LIGHTS_DURATION ) {
      Serial.println("Switch off the lights");
      isLightsOn = false; 
      digitalWrite(LIGHTS_PIN, isDoorOpen);
    }
  }
}

// Send temp value
String sendTemperature(float temp){
  String to_send = "temp," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(temp);
  Serial.println(to_send);
  return to_send;
}

// Send temp value
String sendHumidity(float humi){
  String to_send = "humi," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(humi);
  Serial.println(to_send);
  return to_send;
}

// Send card UID
String sendCardUID(String cardUID){
  String to_send = "door," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(cardUID);
  Serial.println(to_send);
  return to_send;
}

// Send lumen value
String sendLuminosity(float lumen){
  String to_send = "lux," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(lumen);
  Serial.println(to_send);
  return to_send;
}

// Send sound value
String sendSound(float sound){
  String to_send = "sound," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(sound);
  Serial.println(to_send);
  return to_send;
}

// Send move value
String sendMove(bool movement){
  String to_send = "move," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(movement);
  Serial.println(to_send);
  return to_send;
}
