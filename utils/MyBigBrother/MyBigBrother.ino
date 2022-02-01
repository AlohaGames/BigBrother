/*
 * Created by Aloha Corp
 */
#include <DFRobot_PN532.h>

#define ID_CARTE "S1"
#define ROOM "R1"
#define PIN_LM35 A0
#define DELAY 3000

// Variables
DFRobot_PN532_UART nfc;
DFRobot_PN532::sCard_t card;

void setup() {
  InitCommunicationSerie();

  // Initiate nfc
  while (!nfc.begin(&Serial)) {
    delay (1000);
  }
  delay(DELAY);
}

void loop() {

  Serial.println("Bonjour");
  
  float temp = 0.0;
  int light;
  String UIDcard;
  
  // Get the temperature
  temp = calcTemp();
  sendTemperature(temp);

  // Get the card UID
  if(nfc.scan() == true){
    card = nfc.getInformation();
    UIDcard = nfc.readUid();
    sendCardUID(UIDcard);
  }

  // Set delay
  delay(DELAY);
}

// Init communication with computer
void InitCommunicationSerie() {
  Serial.begin(9600);    
  while (!Serial) {}
}

// Temperature calcul
float calcTemp(){
  //get the value from the temp sensor
  float adcVal = analogRead(PIN_LM35);
  //convert voltage to temperature in Celsius
  float temp_celsius = adcVal * (5.0 / 1023.0 * 100);
  return temp_celsius;
}

// Print temp value
void sendTemperature(float temp){
  Serial.println("temp, " + String(ID_CARTE) + ","+ String(ROOM) + ";"+ String(temp));
}

// Print card UID
void sendCardUID(String cardUID){
  Serial.println("door," + String(ID_CARTE) + ","+ String(ROOM) + ";"+ String(cardUID));
}
