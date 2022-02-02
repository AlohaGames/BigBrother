//
// Created by AlohaGames on 01/02/2022.
//

#ifndef TESTBIGBROTHER_BLUETOOTHMGR_H
#define TESTBIGBROTHER_BLUETOOTHMGR_H

#include <SoftwareSerial.h>

#define BT_DEBUG true

class String;


class BluetoothMgr : public SoftwareSerial
{
public:
    BluetoothMgr();

    void init();
    void sendCommand(const String &command);

private:
    void log(const String &msg);
    void logError(const String &msg);
};


#endif //TESTBIGBROTHER_BLUETOOTHMGR_H
