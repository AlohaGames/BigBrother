#include <Servo.h>
Servo myservo;

void setup(){
  myservo.attach(6);
  myservo.write(0);// move servos to center position -> 90°
} 
void loop(){
  
  myservo.write(0);// move servos to center position -> 60°
  delay(2000);
  myservo.write(90);// move servos to center position -> 120°
  delay(2000);
  
}
