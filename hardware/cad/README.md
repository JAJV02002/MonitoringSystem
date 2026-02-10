# 3D CAD Files - Enclosure Design

This directory contains the 3D CAD files for the PV Monitoring System enclosure.

## Files Structure

### SolidWorks Files
- `Enclosure_Main.SLDPRT` - Main enclosure body
- `Enclosure_Lid.SLDPRT` - Enclosure lid/cover
- `Mounting_Bracket.SLDPRT` - Wall/pole mounting bracket
- `Assembly.SLDASM` - Complete assembly file

### STL Files (for 3D Printing)
- `Enclosure_Main.STL` - Main body (ready for 3D printing)
- `Enclosure_Lid.STL` - Lid (ready for 3D printing)
- `Mounting_Bracket.STL` - Bracket (ready for 3D printing)

## Design Specifications

### Enclosure Dimensions
- External: 120mm x 80mm x 50mm
- Internal clearance: 110mm x 70mm x 40mm
- Wall thickness: 3mm
- Material: ABS or PETG for 3D printing

### Features
- Ventilation slots for heat dissipation
- Cable glands for sensor/power connections
- PCB mounting bosses with M3 mounting holes
- Snap-fit lid with seal groove
- DIN rail mounting option
- Weather-resistant design (IP54 rated)

### Mounting Options
1. Wall mount using included bracket
2. DIN rail mount
3. Pole mount (25-50mm diameter)

## 3D Printing Guidelines

### Print Settings
- Layer height: 0.2mm
- Infill: 20-30%
- Support: Yes (for overhangs)
- Orientation: Print lid upside down, body right side up

### Materials
- **Recommended**: PETG (weather resistant)
- **Alternative**: ABS (higher strength)
- **Not recommended**: PLA (not suitable for outdoor use)

### Post-Processing
1. Remove support material
2. Clean mounting holes with M3 tap
3. Test fit PCB before final assembly
4. Apply sealant to lid groove if needed

## Assembly Instructions

1. Insert PCB into mounting bosses
2. Secure with M3 x 8mm screws
3. Route cables through cable glands
4. Install gasket in lid groove
5. Snap lid onto enclosure
6. Secure with optional screws for permanent installation

## Software Required

- **SolidWorks 2019 or later** - for editing SLDPRT/SLDASM files
- **Any STL viewer/slicer** - for viewing and preparing STL files for printing
  - Recommended: PrusaSlicer, Cura, or Simplify3D

## Notes

- All dimensions in millimeters
- Design follows IP54 rating when properly assembled with gasket
- Ventilation slots positioned to prevent water ingress
- UV-resistant material recommended for outdoor installations
