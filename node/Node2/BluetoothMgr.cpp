//
// Created by AlohaGames on 01/02/2022.
//
#include <Arduino.h>

#include "BluetoothMgr.h"
#include "PinCfg.h"

BluetoothMgr::BluetoothMgr() : SoftwareSerial(BT_RX_PIN, BT_TX_PIN) {}

void BluetoothMgr::init()
{
    pinMode(BT_KEY_PIN, OUTPUT);
    pinMode(BT_TX_PIN, OUTPUT);
    pinMode(BT_RX_PIN, INPUT);

    this->begin(38400);

    delay(1000);

    digitalWrite(BT_KEY_PIN, HIGH);

    this->setTimeout(1000);

    sendCommand("AT+RESET");
    logError(this->readString());

    sendCommand("AT+ROLE=1");

    logError(this->readString());

    sendCommand("AT+CMODE=0");

    logError(this->readString());

    sendCommand("AT+BIND=98D3,32,10FE28");

    logError(this->readString());

    sendCommand("AT+INIT");

    logError(this->readString());

    sendCommand("AT+STATE");

    logError(this->readString());


    /*sendCommand("AT+LINK=98D3,32,10FE28");

    logError(this->readString());*/

    digitalWrite(BT_KEY_PIN, LOW);
}

void BluetoothMgr::sendCommand(const String &command)
{
    String tmp = command + "\r\n";
    log("Send command: " + command);
    this->write(tmp.c_str());
}

void BluetoothMgr::log(const String &msg)
{
    if(BT_DEBUG == true)
        Serial.println(msg);
}

void BluetoothMgr::logError(const String &msg)
{
    if(msg != "OK\r\n" && msg != "")
        Serial.println("BT ERROR: {" + msg + "}");
    else
        Serial.println(msg);
}
