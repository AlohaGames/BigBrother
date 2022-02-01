//www.elegoo.com
//2016.12.9

int presLedPin = 13;  // LED on Pin 13 of Arduino
int presSensorPin = 7; // Input for HC-S501

int presValue; // Place to store read PIR Value


void setup() {
  Serial.begin(9600);
  pinMode(presLedPin, OUTPUT); // Set presence led to output
  pinMode(presSensorPin, INPUT); // Set presence sensor to input
 
  digitalWrite(presValue, LOW); // Initialize presence led to LOW
}

void loop() {
  presValue = digitalRead(presSensorPin); // Get presence sensor's value
  digitalWrite(presLedPin, presValue); // Write presence sensor's value on led
  Serial.println(presValue);
}
