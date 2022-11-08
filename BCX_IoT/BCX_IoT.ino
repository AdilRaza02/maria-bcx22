// Adafruit Circuit Playground - Version: Latest
// #include <Adafruit_CircuitPlayground.h>

#include <ArduinoJson.h>

#define NUM_DEVICE 1
#define NUM_LEDS 10

int RGB1_PIN[3] = { 3, 5, 6 };

const int rows = 3;
const int columns = 3;
int LIGHT_TEMP[rows][columns] = { { 255, 255, 255 },
                                  { 255, 142, 33 },
                                  { 255, 56, 0 } };

StaticJsonDocument<200> doc;

int light_intensity;            // 0 to 255
int light_r, light_g, light_b;  // 0 to 255
float temperature = 0.0f;

void setup() {
  Serial.begin(9600);
}

void loop() {

  for (int i = 0; i < rows; i++) {
    setLightIntensity(LIGHT_TEMP[i][0], LIGHT_TEMP[i][1], LIGHT_TEMP[i][2]);
    delay(500);
  }
}


String message() {
  // num_device
  doc["num_device"] = NUM_DEVICE;
  doc["light_r"] = light_r;
  doc["light_g"] = light_g;
  doc["light_b"] = light_b;
  doc["temperature"] = temperature;
}

void setLightIntensity(int r, int g, int b) {
  analogWrite(RGB1_PIN[0], r);
  analogWrite(RGB1_PIN[1], g);
  analogWrite(RGB1_PIN[2], b);
}