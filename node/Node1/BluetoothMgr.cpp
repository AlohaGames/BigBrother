//
// Created by AlohaGames on 01/02/2022.
//
#include <Arduino.h>
#include <String.h>

#include "BluetoothMgr.h"
#include "PinCfg.h"

BluetoothMgr::BluetoothMgr() : SoftwareSerial(BT_RX_PIN, BT_TX_PIN) {}

void BluetoothMgr::init()
{
    Serial.print("Coucou");
    this->begin(38400);

    delay(1000);

    Serial.print("HeHo");

    digitalWrite(BT_KEY_PIN, HIGH);

    this->setTimeout(1000);

    sendCommand("AT+RESET");
    log(this->readString());


    sendCommand("AT+ROLE=1");

    log(this->readString());

    sendCommand("AT+CMODE=1");

    log(this->readString());

    sendCommand("AT+INIT");

    log(this->readString());

    sendCommand("AT+STATE");

    log(this->readString());


    sendCommand("AT+LINK=98D3,32,10FE28");

    digitalWrite(BT_KEY_PIN, LOW);
}

void BluetoothMgr::sendCommand(const String &command)
{
    String tmp = command + "\r\n";
    log("Send command: " + tmp);
    this->write(tmp.c_str());
}

void BluetoothMgr::log(const String &msg)
{
    if(BT_DEBUG == true)
        Serial.println(msg);
}

void BluetoothMgr::logError(const String &msg)
{
    if(msg != "OK\r\n")
        Serial.println("BT ERROR: {" + msg + "}");
    else
        Serial.println(msg);
}