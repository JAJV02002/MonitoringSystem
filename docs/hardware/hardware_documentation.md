# Hardware Documentation

## PV Monitoring System Hardware

This document provides detailed information about the hardware components of the PV Monitoring System.

## System Overview

The PV Monitoring System is designed to monitor photovoltaic (solar panel) installations in real-time. It measures voltage, current, power output, and temperature to provide comprehensive monitoring capabilities.

## Block Diagram

```
PV Panel → Voltage Divider → ESP32 (ADC)
        ↓
Current Sensor (ACS712) → ESP32 (ADC)
        ↓
Temperature Sensor → ESP32 (GPIO)
        ↓
ESP32 WiFi → Backend Server
```

## Main Components

### 1. Microcontroller Unit (MCU)

**ESP32-WROOM-32**
- Dual-core processor (240 MHz)
- Built-in WiFi 802.11 b/g/n
- 12-bit ADC (18 channels)
- Operating voltage: 3.3V
- Input voltage: 5V via USB or VIN pin

**Key Features:**
- Low power consumption
- Rich peripheral interfaces
- Arduino IDE compatible
- Extensive library support

### 2. Voltage Sensor Circuit

**Voltage Divider Configuration**
- Input range: 0-50V DC
- Output range: 0-3.3V (ESP32 safe)
- Resistor ratio: 15:1
- Components:
  - R1: 150kΩ (1%, 0.5W)
  - R2: 10kΩ (1%, 0.25W)
  - C1: 100nF ceramic capacitor (filtering)

**Calculation:**
```
Vout = Vin × (R2 / (R1 + R2))
For 50V input: Vout = 50 × (10 / 160) = 3.125V
```

### 3. Current Sensor

**ACS712-30A Module**
- Hall-effect based current sensor
- Measurement range: ±30A
- Sensitivity: 66mV/A
- Supply voltage: 5V
- Output voltage: 2.5V at 0A (offset)

**Features:**
- Electrical isolation (2.1kV RMS)
- Low noise analog signal
- Fast response time (5μs)
- Overcurrent fault detection

### 4. Temperature Sensor

**DS18B20 Digital Temperature Sensor**
- Temperature range: -55°C to +125°C
- Accuracy: ±0.5°C (-10°C to +85°C)
- Resolution: 9 to 12-bit (configurable)
- Interface: One-Wire protocol
- Operating voltage: 3.0V to 5.5V

**Alternative: DHT22**
- Temperature range: -40°C to +80°C
- Humidity: 0-100% RH
- Digital output (single-wire protocol)

### 5. Power Supply

**Buck Converter Module (LM2596)**
- Input voltage: 7-35V DC
- Output voltage: 5V DC (adjustable)
- Output current: Up to 3A
- Efficiency: ~90%

**Features:**
- Overcurrent protection
- Thermal shutdown
- Short circuit protection

**Alternative: USB Power**
- Standard 5V USB power supply
- Minimum 1A current rating

## PCB Design

### Layer Stack

1. **Top Layer**
   - Component placement
   - Signal routing
   - Power traces

2. **Bottom Layer**
   - Ground plane
   - Return paths
   - Additional routing

### Design Rules

- Minimum trace width: 0.25mm (10mil)
- Minimum clearance: 0.2mm (8mil)
- Via size: 0.8mm diameter, 0.4mm drill
- Pad size: 1.5mm for through-hole, 0.8mm for SMD

### Critical Design Considerations

1. **Analog Signal Integrity**
   - Separate analog and digital grounds
   - Star ground configuration
   - Shield sensitive traces
   - Add filtering capacitors close to ADC pins

2. **Power Distribution**
   - Wide power traces (>1mm)
   - Bypass capacitors at each IC (100nF + 10μF)
   - Separate 3.3V and 5V planes

3. **EMI/EMC**
   - Ground plane coverage >80%
   - Keep antenna area clear
   - Route high-speed signals away from edges
   - Add ferrite beads on power lines

## Enclosure

### Specifications

- Dimensions: 120mm × 80mm × 50mm
- Material: ABS or PETG (UV resistant)
- Protection rating: IP54
- Mounting: Wall, DIN rail, or pole mount

### Features

1. **Cable Entry**
   - PG7 cable glands (3x)
   - Rubber seals for weatherproofing
   - Strain relief

2. **Ventilation**
   - Ventilation slots on sides
   - Angled design prevents water ingress
   - Passive cooling for electronics

3. **Mounting**
   - 4x M4 mounting holes
   - DIN rail clip option
   - Pole clamp bracket (25-50mm)

4. **Access**
   - Snap-fit lid with gasket
   - Optional security screws
   - Transparent window for LED indicators

## Assembly Instructions

### PCB Assembly

1. **Component Placement Order**
   - SMD components (if any)
   - Low-profile components (resistors, capacitors)
   - ICs and sockets
   - Connectors and tall components

2. **Soldering**
   - Use lead-free solder (SAC305)
   - Temperature: 350°C
   - Clean flux residue with isopropyl alcohol

3. **Testing**
   - Visual inspection
   - Continuity tests
   - Power-on test (without MCU)
   - Program and test MCU

### Enclosure Assembly

1. Install PCB mounting standoffs (M3 × 8mm)
2. Mount PCB and secure with screws
3. Connect external sensors and power
4. Route cables through cable glands
5. Test all connections
6. Install gasket in lid groove
7. Close enclosure and test seal

## Wiring Diagram

```
PV Panel (+) ───────┬──────→ Voltage Divider → ESP32 GPIO34
                    │
                    └──────→ Current Sensor → ESP32 GPIO35

PV Panel (-) ───────→ Current Sensor → GND

Temperature Sensor ───→ ESP32 GPIO32 (One-Wire)

Power Supply:
External 12V ───→ Buck Converter → 5V → ESP32 VIN
                                      → Sensors VCC
```

## Specifications

### Electrical

- Input voltage: 7-35V DC (from external power supply)
- Operating voltage: 5V DC / 3.3V DC
- Power consumption: <2W typical, <5W max
- Measurement range:
  - Voltage: 0-50V DC
  - Current: 0-30A DC
  - Temperature: -10°C to +85°C

### Environmental

- Operating temperature: -10°C to +60°C
- Storage temperature: -20°C to +70°C
- Humidity: 10-90% RH (non-condensing)
- Altitude: Up to 2000m

### Mechanical

- Weight: ~150g (with enclosure)
- Dimensions: 120 × 80 × 50mm
- Mounting: Universal mounting bracket included

## Safety Considerations

### Electrical Safety

1. **Isolation**
   - Maintain proper isolation between PV voltage and low voltage circuits
   - Use optocouplers for additional isolation if needed
   - Ensure adequate creepage and clearance distances

2. **Overcurrent Protection**
   - Install appropriate fuses on PV input
   - Fuse rating: 10A fast-blow recommended
   - Place fuse before current sensor

3. **Overvoltage Protection**
   - TVS diodes on ADC inputs
   - Zener diodes for voltage clamping
   - MOV on power input

### Installation Safety

1. **Qualified Personnel**
   - Installation by qualified electrician
   - Follow local electrical codes
   - Obtain necessary permits

2. **Disconnection**
   - Disconnect PV panels before installation
   - Use proper lockout/tagout procedures
   - Verify zero voltage with multimeter

3. **Grounding**
   - Connect enclosure to ground
   - Ensure proper earth connection
   - Test ground continuity

## Maintenance

### Regular Maintenance (Every 6 months)

1. Visual inspection for damage
2. Clean enclosure exterior
3. Check cable gland seals
4. Verify LED indicators
5. Test communication

### Annual Maintenance

1. Open enclosure and inspect interior
2. Check for corrosion or moisture
3. Re-seal if necessary
4. Verify sensor calibration
5. Update firmware if available

## Troubleshooting

### No Power
- Check power supply voltage
- Verify fuse continuity
- Test buck converter output
- Check ESP32 power LED

### Incorrect Readings
- Verify sensor connections
- Check calibration constants
- Measure sensor outputs directly
- Replace faulty sensors

### No WiFi Connection
- Check antenna connection
- Verify WiFi credentials
- Test WiFi signal strength
- Check ESP32 WiFi LED

### Intermittent Operation
- Check for loose connections
- Verify power supply stability
- Check for overheating
- Inspect solder joints

## Bill of Materials (BOM)

| Ref | Component | Value/Part# | Qty | Notes |
|-----|-----------|-------------|-----|-------|
| U1 | MCU | ESP32-WROOM-32 | 1 | Main controller |
| U2 | Current Sensor | ACS712-30A | 1 | Hall effect |
| U3 | Temp Sensor | DS18B20 | 1 | One-Wire |
| U4 | Buck Converter | LM2596 | 1 | DC-DC |
| R1 | Resistor | 150kΩ 1% | 1 | Voltage divider |
| R2 | Resistor | 10kΩ 1% | 1 | Voltage divider |
| R3 | Resistor | 4.7kΩ | 1 | Pull-up |
| C1-C4 | Capacitor | 100nF | 4 | Filtering |
| C5-C6 | Capacitor | 10μF | 2 | Bulk |
| D1 | LED | Red 3mm | 1 | Status |
| F1 | Fuse | 10A | 1 | Protection |
| J1 | Connector | Screw Terminal 2-pin | 1 | PV input |
| J2 | Connector | Screw Terminal 2-pin | 1 | Power input |
| - | Cable Gland | PG7 | 3 | Weatherproof |
| - | Enclosure | ABS 120×80×50 | 1 | IP54 rated |
| - | PCB | Custom | 1 | 2-layer |

## Certifications and Standards

- CE marked (Europe)
- FCC compliant (USA)
- RoHS compliant
- Follows IEC 61730 (PV module safety)
- IP54 ingress protection

## References

- ESP32 Technical Reference Manual
- ACS712 Datasheet
- DS18B20 Datasheet
- IEC 61730: PV Module Safety Qualification
- IEEE 1547: Interconnection Standards

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-10 | Initial release |
