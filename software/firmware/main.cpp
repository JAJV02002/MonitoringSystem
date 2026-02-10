#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Server configuration
const char* serverUrl = "http://your-server.com/api/data";

// Pin definitions
#define VOLTAGE_SENSOR_PIN 34
#define CURRENT_SENSOR_PIN 35
#define TEMP_SENSOR_PIN 32
#define LED_PIN 2

// Sensor calibration constants
#define VOLTAGE_MULTIPLIER 0.0128
#define CURRENT_OFFSET 2.5
#define CURRENT_SENSITIVITY 0.185

// Global variables
float voltage = 0.0;
float current = 0.0;
float power = 0.0;
float temperature = 0.0;
unsigned long lastSendTime = 0;
const unsigned long sendInterval = 60000; // Send data every 60 seconds

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  
  // Initialize WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  
  // Initialize analog inputs
  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);
  
  Serial.println("PV Monitoring System initialized");
  digitalWrite(LED_PIN, HIGH);
}

void loop() {
  // Read sensors
  readSensors();
  
  // Display readings
  displayReadings();
  
  // Send data to server if interval has passed
  if (millis() - lastSendTime >= sendInterval) {
    sendDataToServer();
    lastSendTime = millis();
  }
  
  delay(1000);
}

void readSensors() {
  // Read voltage (0-50V range)
  int voltageRaw = analogRead(VOLTAGE_SENSOR_PIN);
  voltage = voltageRaw * VOLTAGE_MULTIPLIER;
  
  // Read current (ACS712 30A module)
  int currentRaw = analogRead(CURRENT_SENSOR_PIN);
  float currentVoltage = (currentRaw / 4095.0) * 3.3;
  current = abs((currentVoltage - CURRENT_OFFSET) / CURRENT_SENSITIVITY);
  
  // Calculate power
  power = voltage * current;
  
  // Read temperature (simulated for now)
  int tempRaw = analogRead(TEMP_SENSOR_PIN);
  temperature = (tempRaw / 4095.0) * 100.0; // Convert to temperature range 0-100°C
}

void displayReadings() {
  Serial.println("=== PV System Status ===");
  Serial.print("Voltage: ");
  Serial.print(voltage, 2);
  Serial.println(" V");
  
  Serial.print("Current: ");
  Serial.print(current, 2);
  Serial.println(" A");
  
  Serial.print("Power: ");
  Serial.print(power, 2);
  Serial.println(" W");
  
  Serial.print("Temperature: ");
  Serial.print(temperature, 1);
  Serial.println(" °C");
  Serial.println("========================");
}

void sendDataToServer() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    // Create JSON payload
    StaticJsonDocument<200> doc;
    doc["voltage"] = voltage;
    doc["current"] = current;
    doc["power"] = power;
    doc["temperature"] = temperature;
    doc["timestamp"] = millis();
    
    String jsonString;
    serializeJson(doc, jsonString);
    
    // Send POST request
    int httpResponseCode = http.POST(jsonString);
    
    if (httpResponseCode > 0) {
      Serial.print("Data sent successfully. Response code: ");
      Serial.println(httpResponseCode);
      // Blink LED to indicate successful transmission
      digitalWrite(LED_PIN, LOW);
      delay(100);
      digitalWrite(LED_PIN, HIGH);
    } else {
      Serial.print("Error sending data. Error code: ");
      Serial.println(httpResponseCode);
    }
    
    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
}
