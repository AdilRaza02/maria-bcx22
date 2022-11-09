#include <ArduinoJson.h>
#include <Adafruit_CircuitPlayground.h>

#define NUM_DEVICE 1

StaticJsonDocument<200> doc;
StaticJsonDocument<200> doc_from_serial;

// message always sending
// {"num_device":1,"temperature":24.84582901,"light_r":255,"light_g":142,"light_b":33,"light_intensity":128}

void setup() {

  CircuitPlayground.begin();

  init_packet_message();
  Serial.begin(9600);
}

const float threshold_percent_temperature = 0.2f; // 0.2 = 20%
float min_temp;
float max_temp;

void initialize_threshold_temperature(){
  float temp_total = 0;
  int rounds = 10;
  
  for(int i = 0; i < rounds; i ++){
    temp_total = temp_total + CircuitPlayground.temperature();
  }
 
  temp_total = temp_total / rounds;
  
  max_temp = temp_total + (temp_total * threshold_percent_temperature); // current_temperature + threshold
  min_temp = temp_total - (temp_total * threshold_percent_temperature); // current_temperature - threshold
}

void setLightColor(int value) {
  CircuitPlayground.strip.setBrightness(value);  // 0 to 255
  CircuitPlayground.strip.show();
}

void setLightColor(int r, int g, int b) {

  for (int i = 0; i < 10; i++) {
    CircuitPlayground.strip.setPixelColor(i, r, g, b);
  }
  CircuitPlayground.strip.show();
  doc["light_r"] = r;
  doc["light_g"] = g;
  doc["light_b"] = b;
}

void loop() {

  while (!Serial)
    return;

  if (Serial.available() > 0) {

    // receiving
    String s = Serial.readStringUntil('\n');
    DeserializationError error = deserializeJson(doc_from_serial, s);

    // Test if parsing succeeds.
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.c_str());
      return;
    }

    doc["light_r"] = doc_from_serial["light_r"];
    doc["light_g"] = doc_from_serial["light_g"];
    doc["light_b"] = doc_from_serial["light_b"];

    setLightColor(doc["light_r"], doc["light_g"], doc["light_b"]);

    setLightColor(doc["light_intensity"]);
  }

  // sending
  doc["temperature"] = CircuitPlayground.temperature();
  serializeJson(doc, Serial);
  Serial.println();
}


void init_packet_message() {
  // example to send
  // white cold
  // {"light_r":255,"light_g":255,"light_b":255,"light_intensity":255}
  // white mid
  // {"light_r":255,"light_g":142,"light_b":33,"light_intensity":255}
  // white warm
  // {"light_r":255,"light_g":56,"light_b":0,"light_intensity":255}

  // num_device
  doc["num_device"] = NUM_DEVICE;
  doc["temperature"] = 0;

  doc["light_r"] = 0;
  doc["light_g"] = 255;
  doc["light_b"] = 0;

  doc["light_intensity"] = 128;

  setLightColor(doc["light_r"], doc["light_g"], doc["light_b"]);

  CircuitPlayground.strip.setBrightness(doc["light_intensity"]);  // 0 to 255
}
