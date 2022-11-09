#include <ArduinoJson.h>

#define NUM_DEVICE 1

int num_leds = 3;
int RGB_PINOUT[num_leds][3] = { { 3, 5, 6 },
                                { 9, 10, 11 },
                                { A0, A1, A2 } };

const int rows = 3;
const int columns = 3;
int LIGHT_TEMP[rows][columns] = { { 255, 255, 255 },
                                  { 255, 142, 33 },
                                  { 255, 56, 0 } };

StaticJsonDocument<200> doc;

int light_r, light_g, light_b;  // 0 to 255
float temperature = 0.0f;

void setup() {
  init_packet_message();
  Serial.begin(9600);
}

void loop() {

  if (Serial.available() > 0) {
    String s = Serial.readStringUntil('\n');
    DeserializationError error = deserializeJson(doc, s);

    // Test if parsing succeeds.
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.c_str());
      return;
    }

    setLightIntensity(doc["light_r"], doc["light_g"], doc["light_b"]);
  }

  serializeJson(doc, Serial);
  Serial.println();
}


void init_packet_message() {
  // {"num_device":1,"temperature":0,"light_r":255,"light_g":255,"light_b":255}
  // {"num_device":1,"temperature":0,"light_r":255,"light_g":142,"light_b":33}
  // {"num_device":1,"temperature":0,"light_r":255,"light_g":56,"light_b":0}

  // num_device
  doc["num_device"] = NUM_DEVICE;
  doc["temperature"] = 0;

  doc["light1_r"] = 0;
  doc["light1_g"] = 255;
  doc["light1_b"] = 0;

  doc["light2_r"] = 0;
  doc["light2_g"] = 255;
  doc["light2_b"] = 0;

  doc["light3_r"] = 0;
  doc["light3_g"] = 255;
  doc["light3_b"] = 0;

  for (int i = 0; i < num_leds; i++) {
    setLightIntensity(i, doc["light_r"], doc["light_g"], doc["light_b"]);
  }
}

void setLightIntensity(int num_led, int r, int g, int b) {
  analogWrite(RGB_PINOUT[num_led][0], r);
  analogWrite(RGB_PINOUT[num_led][1], g);
  analogWrite(RGB_PINOUT[num_led][2], b);

  if (num_led == 0) {
    doc["light1_r"] = r;
    doc["light1_g"] = g;
    doc["light1_b"] = b;
  } else if (num_led == 0) {
    doc["light2_r"] = r;
    doc["light2_g"] = g;
    doc["light2_b"] = b;
  } else if (num_led == 0) {
    doc["light3_r"] = r;
    doc["light3_g"] = g;
    doc["light3_b"] = b;
  }
}