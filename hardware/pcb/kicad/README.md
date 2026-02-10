# PCB Design - KiCad Project

This directory contains the KiCad project files for the PV Monitoring System PCB.

## Files

- `MonitoringSystem.kicad_pro` - KiCad project file
- `MonitoringSystem.kicad_sch` - Main schematic file
- `MonitoringSystem.kicad_pcb` - PCB layout file (to be created)

## Hardware Components

### Microcontroller
- ESP32-WROOM-32 for WiFi connectivity and data processing

### Sensors and Inputs
- Voltage sensor for PV panel monitoring
- Current sensor (ACS712 or similar)
- Temperature sensor (DS18B20)
- Ambient light sensor

### Power Supply
- DC-DC converter (5V/3.3V)
- Protection circuitry

### Communication
- WiFi (ESP32 integrated)
- Optional: RS485 for Modbus communication

## Design Guidelines

1. Follow proper ground plane design
2. Separate analog and digital grounds
3. Add proper decoupling capacitors
4. Include test points for debugging
5. Add protection circuits for sensor inputs

## Opening the Project

1. Install KiCad 6.0 or later
2. Open `MonitoringSystem.kicad_pro` in KiCad
3. Use the schematic editor to view/edit the circuit
4. Use the PCB editor to design the board layout

## Manufacturing

- Recommended PCB specifications:
  - 2-layer PCB
  - FR-4 material
  - 1.6mm thickness
  - HASL or ENIG finish
  - Minimum trace width: 0.25mm
  - Minimum via size: 0.8mm diameter, 0.4mm drill
