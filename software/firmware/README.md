# PV Monitoring System - Firmware

ESP32-based firmware for monitoring photovoltaic (PV) generation systems.

## Features

- Real-time voltage monitoring (0-50V)
- Current measurement using ACS712 sensor
- Power calculation
- Temperature monitoring
- WiFi connectivity
- HTTP API for data transmission
- LED status indicators

## Hardware Requirements

- ESP32 Development Board (ESP32-WROOM-32)
- Voltage sensor (0-50V divider)
- Current sensor (ACS712 30A module)
- Temperature sensor (optional)
- Power supply (5V)

## Pin Configuration

| Pin | Function |
|-----|----------|
| GPIO34 | Voltage Sensor Input |
| GPIO35 | Current Sensor Input |
| GPIO32 | Temperature Sensor Input |
| GPIO2 | Status LED |

## Software Requirements

- PlatformIO IDE or Arduino IDE
- ESP32 board support package

## Installation

### Using PlatformIO (Recommended)

1. Install [PlatformIO](https://platformio.org/)
2. Clone this repository
3. Open the firmware folder in PlatformIO
4. Update WiFi credentials in `main.cpp`:
   ```cpp
   const char* ssid = "YOUR_WIFI_SSID";
   const char* password = "YOUR_WIFI_PASSWORD";
   ```
5. Update server URL if needed
6. Build and upload to ESP32:
   ```bash
   pio run --target upload
   ```

### Using Arduino IDE

1. Install Arduino IDE
2. Add ESP32 board support:
   - Go to File > Preferences
   - Add `https://dl.espressif.com/dl/package_esp32_index.json` to Additional Boards Manager URLs
3. Install required libraries:
   - ArduinoJson (by Benoit Blanchon)
4. Open `main.cpp` and configure WiFi credentials
5. Select ESP32 Dev Module from Tools > Board
6. Upload to ESP32

## Configuration

### Sensor Calibration

Adjust calibration constants in `main.cpp`:

```cpp
#define VOLTAGE_MULTIPLIER 0.0128  // Adjust for your voltage divider
#define CURRENT_OFFSET 2.5         // Adjust for your ACS712 offset
#define CURRENT_SENSITIVITY 0.185  // 185mV/A for ACS712 30A
```

### Data Transmission Interval

Change the interval between data transmissions:

```cpp
const unsigned long sendInterval = 60000; // milliseconds (60 seconds)
```

## API

The firmware sends JSON data to the configured server endpoint:

```json
{
  "voltage": 24.5,
  "current": 3.2,
  "power": 78.4,
  "temperature": 28.5,
  "timestamp": 123456789
}
```

## Monitoring

Use serial monitor to view real-time data:

```bash
pio device monitor
```

Or in Arduino IDE: Tools > Serial Monitor (115200 baud)

## Troubleshooting

### WiFi Connection Issues
- Verify SSID and password are correct
- Check WiFi signal strength
- Ensure 2.4GHz WiFi is enabled (ESP32 doesn't support 5GHz)

### Sensor Reading Issues
- Check sensor wiring and connections
- Verify sensor power supply
- Adjust calibration constants

### Upload Issues
- Press and hold BOOT button during upload
- Check USB cable and port
- Verify correct board is selected

## License

MIT License - see LICENSE file for details
