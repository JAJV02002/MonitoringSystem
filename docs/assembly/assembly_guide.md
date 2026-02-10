# Assembly and Installation Guide

## PV Monitoring System - Complete Assembly Instructions

This guide provides step-by-step instructions for assembling and installing the PV Monitoring System.

## Required Tools

### Electronics Tools
- Soldering iron (temperature controlled)
- Solder (lead-free, SAC305)
- Wire strippers
- Wire cutters
- Multimeter
- Tweezers
- Helping hands or PCB holder
- Flux pen
- Desoldering wick/pump

### Mechanical Tools
- Screwdriver set (Phillips and flathead)
- Hex key set (Allen keys)
- Drill with bits (if mounting on wall)
- Cable ties
- Heat shrink tubing
- Hot glue gun (optional)

### Safety Equipment
- Safety glasses
- ESD wrist strap
- Work gloves
- Fire extinguisher (nearby)

## Parts Checklist

Before starting, verify you have all components:

### Electronic Components
- [ ] ESP32-WROOM-32 development board
- [ ] ACS712-30A current sensor module
- [ ] DS18B20 temperature sensor
- [ ] LM2596 buck converter module
- [ ] Resistors (see BOM)
- [ ] Capacitors (see BOM)
- [ ] LED indicator
- [ ] Screw terminals
- [ ] PCB (custom or prototype board)

### Mechanical Components
- [ ] Enclosure (120mm × 80mm × 50mm)
- [ ] Enclosure lid with gasket
- [ ] Mounting bracket
- [ ] M3 screws and standoffs (for PCB mounting)
- [ ] M4 screws (for enclosure mounting)
- [ ] Cable glands (PG7, 3 pieces)

### Wiring and Cables
- [ ] 18-22 AWG wire (red, black, various colors)
- [ ] Heat shrink tubing
- [ ] Cable ties
- [ ] Ferrules (optional)

## Assembly Steps

### Phase 1: PCB Assembly (2-3 hours)

#### Step 1: Component Preparation

1. **Inspect PCB**
   - Check for manufacturing defects
   - Verify copper traces continuity
   - Clean board with isopropyl alcohol

2. **Organize Components**
   - Sort components by type
   - Check values with multimeter
   - Place in organized tray

#### Step 2: Solder Resistors and Capacitors

1. **Voltage Divider Resistors**
   - Bend resistor leads at 90°
   - Insert R1 (150kΩ) into PCB
   - Insert R2 (10kΩ) into PCB
   - Solder from bottom
   - Trim excess leads
   - Verify resistance with multimeter

2. **Pull-up Resistor**
   - Insert R3 (4.7kΩ)
   - Solder and trim

3. **Filter Capacitors**
   - Insert C1-C4 (100nF) near sensor inputs
   - Mind polarity if electrolytic
   - Solder all pins

4. **Bulk Capacitors**
   - Insert C5-C6 (10μF) near power pins
   - Ensure correct polarity (+/-)
   - Solder securely

#### Step 3: Solder IC Components

1. **ESP32 Module**
   - Align pins with PCB pads
   - Solder one corner pin first
   - Check alignment
   - Solder remaining pins
   - Apply flux if needed for better flow
   - Inspect for cold joints or bridges

2. **Current Sensor Module**
   - Position ACS712 module
   - Solder or use female headers
   - Verify orientation (IN/OUT)

3. **Buck Converter**
   - Position LM2596 module
   - Solder power connections
   - Test output voltage (should be 5V)

#### Step 4: Solder Connectors

1. **Screw Terminals**
   - Position J1 (PV input)
   - Position J2 (Power input)
   - Solder all pins firmly

2. **LED Indicator**
   - Note polarity (long leg = positive)
   - Insert through PCB
   - Solder and trim

#### Step 5: Quality Control

1. **Visual Inspection**
   - Check all solder joints
   - Look for bridges or cold joints
   - Verify component orientation

2. **Electrical Tests**
   ```
   ✓ Continuity: Power to ground (should be open)
   ✓ Resistance: R1+R2 = 160kΩ
   ✓ Shorts: No shorts between adjacent pins
   ```

3. **Power-On Test**
   - Apply 5V to power input
   - Check 3.3V rail on ESP32
   - Verify LED lights up
   - Measure current draw (<200mA idle)

### Phase 2: Firmware Programming (30 minutes)

#### Step 1: Software Setup

1. **Install Development Environment**
   - Option A: PlatformIO
     ```bash
     # Install PlatformIO Core
     pip install platformio
     ```
   - Option B: Arduino IDE
     - Download from arduino.cc
     - Install ESP32 board support

2. **Open Project**
   - Navigate to `software/firmware/`
   - Open in PlatformIO or Arduino IDE

#### Step 2: Configuration

1. **Edit WiFi Credentials**
   ```cpp
   const char* ssid = "YourWiFiSSID";
   const char* password = "YourWiFiPassword";
   ```

2. **Configure Server URL**
   ```cpp
   const char* serverUrl = "http://your-server-ip:3000/api/data";
   ```

3. **Adjust Calibration** (if needed)
   ```cpp
   #define VOLTAGE_MULTIPLIER 0.0128
   #define CURRENT_OFFSET 2.5
   #define CURRENT_SENSITIVITY 0.185
   ```

#### Step 3: Upload Firmware

1. **Connect ESP32**
   - Use USB cable
   - Wait for driver installation
   - Note COM port

2. **Compile and Upload**
   - PlatformIO: `pio run --target upload`
   - Arduino IDE: Click Upload button
   - Hold BOOT button if needed

3. **Verify Upload**
   - Open serial monitor (115200 baud)
   - Should see initialization messages
   - Verify WiFi connection

### Phase 3: Enclosure Assembly (1 hour)

#### Step 1: Prepare Enclosure

1. **Drill Cable Entry Holes**
   - Mark positions for cable glands
   - Use appropriate drill bit for PG7
   - Deburr holes with file

2. **Install Cable Glands**
   - Insert cable glands
   - Tighten lock nuts from inside
   - Test seal by pulling

3. **Install PCB Standoffs**
   - Position M3 standoffs (8mm height)
   - Mark screw holes
   - Attach standoffs with screws or adhesive

#### Step 2: Mount PCB

1. **Position PCB**
   - Align with standoffs
   - Ensure clearance from enclosure walls
   - Check access to USB port

2. **Secure PCB**
   - Use M3 screws
   - Don't overtighten
   - Verify PCB is level

#### Step 3: External Wiring

1. **Prepare Cables**
   - Cut cables to appropriate length
   - Strip 10mm from ends
   - Apply heat shrink if needed
   - Add ferrules for secure connection

2. **Connect Sensors**
   
   **Temperature Sensor:**
   ```
   DS18B20          ESP32
   -------          -----
   VCC (Red)    →   3.3V
   DATA (Yellow) →  GPIO32
   GND (Black)   →  GND
   ```

   **Voltage Divider:**
   ```
   PV+ → R1 → R2 → ESP32 GPIO34
              ↓
             GND
   ```

   **Current Sensor:**
   ```
   PV+ → ACS712 IN
   ACS712 OUT → Load
   ACS712 Signal → ESP32 GPIO35
   ACS712 VCC → 5V
   ACS712 GND → GND
   ```

3. **Power Connection**
   ```
   External 12V+ → Buck Converter IN+
   External GND  → Buck Converter IN-
   Buck 5V OUT   → ESP32 VIN
   Buck GND      → ESP32 GND
   ```

4. **Secure Cables**
   - Use cable ties inside enclosure
   - Ensure no sharp bends
   - Keep wires away from ventilation

#### Step 4: Seal Enclosure

1. **Final Checks**
   - Verify all connections
   - Ensure no loose parts
   - Check LED is visible

2. **Install Gasket**
   - Clean gasket groove
   - Position gasket evenly
   - Press firmly into place

3. **Close Enclosure**
   - Align lid with body
   - Snap into place or use screws
   - Verify seal all around

### Phase 4: System Testing (1 hour)

#### Step 1: Bench Testing

1. **Power-On Test**
   - Apply power (12V DC)
   - LED should light up
   - Check for unusual sounds/smells
   - Measure current draw

2. **Sensor Testing**
   ```
   Test Condition          Expected Reading
   ----------------        -----------------
   No PV input            Voltage: ~0V
   PV connected (24V)     Voltage: 22-26V
   Load disconnected      Current: ~0A
   Load connected (3A)    Current: 2.5-3.5A
   Room temperature       Temp: 20-25°C
   ```

3. **Communication Test**
   - Open serial monitor
   - Verify sensor readings
   - Check WiFi connection
   - Confirm data transmission
   - Verify backend receives data

#### Step 2: Calibration

1. **Voltage Calibration**
   - Measure actual PV voltage with multimeter
   - Compare with system reading
   - Adjust VOLTAGE_MULTIPLIER if needed
   - Formula: `New = Old × (Actual / Measured)`

2. **Current Calibration**
   - Use known load current
   - Compare with system reading
   - Adjust CURRENT_SENSITIVITY if needed
   - Verify zero-point (no load should read ~0A)

3. **Temperature Calibration**
   - Compare with reference thermometer
   - Most DS18B20 sensors are factory calibrated
   - No adjustment typically needed

### Phase 5: Installation (1-2 hours)

#### Step 1: Site Survey

1. **Location Selection**
   - Accessible for maintenance
   - Protected from direct rain
   - Good WiFi signal strength
   - Away from extreme heat sources
   - Appropriate mounting surface

2. **Safety Verification**
   - PV system can be safely disconnected
   - Proper grounding available
   - Adequate ventilation
   - Comply with local codes

#### Step 2: Mounting

1. **Wall Mount**
   - Mark mounting holes
   - Drill pilot holes
   - Insert wall anchors
   - Attach mounting bracket
   - Secure enclosure to bracket

2. **DIN Rail Mount**
   - Attach DIN rail clip to enclosure
   - Snap onto DIN rail
   - Verify secure attachment

3. **Pole Mount**
   - Use pole mounting bracket
   - Select appropriate size for pole diameter
   - Tighten clamp securely
   - Ensure enclosure is level

#### Step 3: Electrical Connection

**⚠️ WARNING: Always follow lockout/tagout procedures**

1. **Disconnect PV System**
   - Turn off all disconnects
   - Verify zero voltage with multimeter
   - Lock out if possible

2. **Connect Voltage Sensing**
   - Connect voltage divider to PV+ and PV-
   - Ensure proper polarity
   - Secure connections

3. **Connect Current Sensing**
   - Install current sensor in series with load
   - Verify correct direction (arrow on sensor)
   - Ensure tight connections

4. **Connect Power Supply**
   - Connect 12V power source
   - Verify polarity (+ and -)
   - Secure connections

5. **Ground Connection**
   - Connect enclosure ground lug to earth
   - Verify continuity to ground
   - Ensure low resistance (<1Ω)

#### Step 4: System Commissioning

1. **Power Up Sequence**
   - Apply power to monitoring system
   - Wait for LED indicator
   - Check WiFi connection
   - Verify data transmission

2. **Re-energize PV System**
   - Remove lockout/tagout
   - Turn on PV disconnects
   - Monitor system readings
   - Verify normal operation

3. **Final Verification**
   - Check all readings on web interface
   - Verify reasonable values
   - Test alert system (if possible)
   - Document baseline readings

## Maintenance Schedule

### Daily
- Visual LED indicator check
- Review web dashboard

### Weekly
- Check data transmission
- Review alerts
- Verify readings are reasonable

### Monthly
- Inspect enclosure exterior
- Check cable connections
- Clean ventilation slots
- Verify WiFi signal strength

### Quarterly
- Open enclosure and inspect
- Check for moisture or corrosion
- Verify sensor accuracy
- Tighten any loose connections

### Annually
- Full system recalibration
- Replace gasket if worn
- Update firmware if available
- Review and analyze long-term data

## Troubleshooting Common Issues

### Issue: System Not Powering On
**Symptoms:** No LED, no WiFi signal
**Solutions:**
1. Check power supply voltage (should be 12V)
2. Verify fuse continuity
3. Test buck converter output (should be 5V)
4. Check ESP32 for damage

### Issue: Incorrect Voltage Readings
**Symptoms:** Voltage readings too high/low
**Solutions:**
1. Verify voltage divider resistor values
2. Check for loose connections
3. Recalibrate using known voltage source
4. Replace damaged resistors

### Issue: WiFi Won't Connect
**Symptoms:** Status shows "Connecting..." continuously
**Solutions:**
1. Verify SSID and password are correct
2. Check WiFi signal strength (move closer to router)
3. Ensure 2.4GHz WiFi is enabled
4. Restart ESP32
5. Check MAC address filtering on router

### Issue: Data Not Appearing on Dashboard
**Symptoms:** Dashboard shows old data or "Connection Error"
**Solutions:**
1. Verify backend server is running
2. Check server URL in firmware
3. Test network connectivity
4. Review backend logs for errors
5. Check firewall settings

### Issue: Alerts Not Triggering
**Symptoms:** No alerts despite abnormal readings
**Solutions:**
1. Verify alert thresholds in backend
2. Check alert system is enabled
3. Review backend logs
4. Test with known trigger condition

## Safety Warnings

### Electrical Safety
⚠️ **WARNING:** PV systems can produce lethal voltages and currents
- Always disconnect PV system before working
- Use insulated tools
- Wear appropriate PPE
- Follow local electrical codes
- Have qualified electrician verify installation

### Installation Safety
- Work in dry conditions
- Use proper ladder safety
- Wear safety glasses
- Keep workspace organized
- Have fire extinguisher nearby

### Operational Safety
- Do not bypass safety features
- Do not exceed rated voltages (50V max)
- Ensure proper ventilation
- Keep away from water sources
- Use proper grounding

## Support and Documentation

For additional help:
- Review hardware documentation: `docs/hardware/`
- Review software documentation: `docs/software/`
- Check GitHub issues
- Contact technical support

## Certification and Compliance

Ensure your installation complies with:
- Local electrical codes (NEC in USA)
- PV installation standards (IEC 61730)
- Building codes
- Insurance requirements

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-10 | Initial assembly guide |

---

**Document prepared by:** MonitoringSystem Project Team  
**Last updated:** February 10, 2026
