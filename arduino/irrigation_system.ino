#define BLYNK_TEMPLATE_ID "TMPL2Gh2SSTk_" 
#define BLYNK_TEMPLATE_NAME "Water Irrigation System"
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <ESP8266HTTPClient.h>

const char *auth = "h0Ri-GlI7ObNCg1bsfGNyo7ZdDBeRocY";
const char *ssid = "Opixan";
const char *pass = "opixanax24";

BlynkTimer timer;
bool Relay = 0;

#define sensor A0
#define waterPump D3

void setup() {
  Serial.begin(9600);
  pinMode(waterPump, OUTPUT);
  digitalWrite(waterPump, HIGH);

  Blynk.begin(auth, ssid, pass, "blynk.cloud", 80);

  // Call the function
  timer.setInterval(60000L, soilMoistureSensor); // 60,000 milliseconds = 1 minute
}

// Get the button value
BLYNK_WRITE(V1) {
  Relay = param.asInt();

  if (Relay == 1) {
    digitalWrite(waterPump, LOW);
    Serial.println("Motor is ON");
  } else {
    digitalWrite(waterPump, HIGH);
    Serial.println("Motor is OFF");
  }
}

// Get the soil moisture values
void soilMoistureSensor() {
  int value = analogRead(sensor);
  value = map(value, 0, 1024, 0, 100);
  value = (value - 100) * -1;

  Blynk.virtualWrite(V0, value); // Send moisture value to Virtual Pin V0
  Serial.print("Moisture : ");
  Serial.println(value);

  sendMoistureToBackend(value);
}

void sendMoistureToBackend(int moisture) {
  WiFiClient client;
  HTTPClient http;

  // Replace with the IP address or domain of your Node.js server
  String backendUrl = "http://172.20.10.7:3000/soil-moisture";

  http.begin(client, backendUrl);
  http.addHeader("Content-Type", "application/json"); // Set content type to JSON

  // Construct the payload in JSON format
  String postData = "{\"moisture\":" + String(moisture) + "}";

  // Send the HTTP POST request to the Node.js backend
  int httpResponseCode = http.POST(postData);

  // Print the response code for debugging
  Serial.print("Backend Response Code: ");
  Serial.println(httpResponseCode);

  // Close the HTTP connection
  http.end();
}

void loop() {
  Blynk.run(); // Run the Blynk library
  timer.run(); // Run the Blynk timer
}