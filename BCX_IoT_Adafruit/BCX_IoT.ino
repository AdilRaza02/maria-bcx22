#include <ArduinoJson.h>
#include <Adafruit_CircuitPlayground.h>

#define NUM_DEVICE 1

int num_leds = 3;

const int rows = 3;
const int columns = 3;

StaticJsonDocument<200> doc;

int light_r, light_g, light_b;  // 0 to 255
float temperature = 0.0f;

void setup() {
  init_packet_message();
  Serial.begin(9600);
}

void setLightIntensity(int r, int g, int b) {

  for (int i = 0; i < 10; i++) {
    CircuitPlayground.setPixelColor(i, r, g, b);
  }
  doc["light_r"] = r;
  doc["light_g"] = g;
  doc["light_b"] = b;
}

void loop() {

  CircuitPlayground.begin();

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

  doc["light_r"] = 0;
  doc["light_g"] = 255;
  doc["light_b"] = 0;

  setLightIntensity(doc["light_r"], doc["light_g"], doc["light_b"]);
}