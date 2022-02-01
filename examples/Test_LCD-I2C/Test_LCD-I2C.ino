#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,16,2);

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
}

void loop() {
  lcd.clear();
  

  int randomNum = random(0, 2);
  Serial.println(randomNum);

  if(randomNum == 0){
    lcd.setCursor(2,0);
    lcd.print("Acces refuse");
  }
  if(randomNum == 1){
    lcd.setCursor(1,0);
    lcd.print("Acces autorise");
  }
  
  delay(1000);
}
