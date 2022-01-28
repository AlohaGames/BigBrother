/*
 * Created by Aloha Corp
 */

#define ID_CARTE "S1"
#define ROOM "R1"
#define DELAY 3000

void setup() {
  Serial.begin(9600);
}

void loop() {
  float temp = 20;
  float lumen = 100;
  float decibel = 9;
  bool movement = true;
  String card = "59 15 C5 B1";

  sendTemperature(temp);
  sendCardUID(card);
  sendLuminosity(lumen);
  sendSound(decibel); 
  sendMove(movement);

  delay(DELAY);
}

// Send temp value
void sendTemperature(float temp){
  String to_send = "temp," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(temp);
  Serial.println(to_send);
  //return to_send;
}

// Send card UID
void sendCardUID(String cardUID){
  String to_send = "door," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(cardUID);
  Serial.println(to_send);
  //return to_send;
}

// Send lumen value
void sendLuminosity(float lumen){
  String to_send = "lux," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(lumen);
  Serial.println(to_send);
  //return to_send;
}

// Send sound value
void sendSound(float sound){
  String to_send = "sound," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(sound);
  Serial.println(to_send);
}

// Send move value
void sendMove(bool movement){
  String to_send = "move," + String(ID_CARTE) + "," + String(ROOM) + ";" + String(movement);
  Serial.println(to_send);
  //return to_send;
}
