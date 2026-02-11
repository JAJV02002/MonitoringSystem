# PV Monitoring System

A complete monitoring system for photovoltaic (solar) generation systems. This repository includes all necessary files to recreate the entire project: 3D CAD files, PCB design files (KiCad), firmware code (ESP32), backend server, and web frontend.

![System Status](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 Features

- **Real-time Monitoring**: Track voltage, current and power
- **WiFi Connectivity**: ESP32-based wireless data transmission
- **Web Dashboard**: Modern, responsive web interface
- **Historical Data**: Store and analyze performance over time
- **Statistics**: Daily, weekly, and monthly analytics
- **Open Source**: Complete hardware and software designs

## 📁 Repository Structure

```
MonitoringSystem/
├── hardware/
│   ├── cad/                      # 3D designs (SolidWorks & STL files)
│   │   ├── Enclosure_Main.STL
│   │   ├── Enclosure_Lid.STL
│   │   └── README.md
│   └── pcb/
│       └── kicad/                # KiCad PCB project files
│           ├── MonitoringSystem.kicad_pro
│           ├── MonitoringSystem.kicad_sch
│           └── README.md
├── software/
│   ├── firmware/                 # ESP32 firmware (Arduino/C++)
│   │   ├── main.cpp
│   │   ├── platformio.ini
│   │   └── README.md
│   ├── backend/                  # Node.js backend server
│   │   ├── server.js
│   │   ├── package.json
│   │   └── README.md
│   └── frontend/                 # Web UI (HTML/CSS/JavaScript)
│       ├── index.html
│       ├── style.css
│       ├── app.js
│       └── README.md
└── docs/
    ├── hardware/                 # Hardware documentation
    ├── software/                 # Software documentation
    └── assembly/                 # Assembly & installation guide
```

## 🚀 Quick Start

### 1. Hardware Assembly

1. **PCB Manufacturing**: Use KiCad files in `hardware/pcb/kicad/`
2. **3D Printing**: Print enclosure using STL files in `hardware/cad/`
3. **Assembly**: Follow detailed guide in `docs/assembly/assembly_guide.md`

### 2. Firmware Setup

```bash
cd software/firmware
# Edit main.cpp with your WiFi credentials
# Upload to ESP32 using PlatformIO or Arduino IDE
pio run --target upload
```

### 3. Backend Server

```bash
cd software/backend
npm install
npm start
```

### 4. Frontend Interface

```bash
cd software/frontend
# Serve with any web server, or copy to backend/public/
# Access at http://localhost:3000
```

## 📊 System Architecture

```
┌─────────────┐
│   PV Panel  │
└──────┬──────┘
       │
┌──────▼──────────┐
│  ESP32 + Sensors│  ◄── Firmware (C++)
└──────┬──────────┘
       │ WiFi/HTTP
┌──────▼──────────┐
│  Backend Server │  ◄── Node.js + SQLite
└──────┬──────────┘
       │ REST API
┌──────▼──────────┐
│  Web Dashboard  │  ◄── HTML/CSS/JavaScript
└─────────────────┘
```

## 🔧 Hardware Components

### Main Components
- **ESP32-WROOM-32**: Microcontroller with WiFi
- **ACS712-30A**: Current sensor module
- **DS18B20**: Temperature sensor
- **Voltage Divider**: 0-50V measurement range
- **LM2596**: Buck converter for power supply

### Enclosure
- **Material**: ABS/PETG/PLA (3D printed or injection molded)
- **Dimensions**: 120mm × 80mm × 50mm
- **Mounting**: Wall, DIN rail, or pole mount

## 💻 Software Stack

### Firmware
- **Platform**: ESP32 (Arduino framework)
- **Language**: C++
- **Tools**: PlatformIO / Arduino IDE
- **Features**: WiFi, HTTP client, JSON serialization

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **API**: RESTful

### Frontend
- **Technologies**: HTML5, CSS3, JavaScript ES6+
- **Visualization**: Chart.js
- **Design**: Responsive, mobile-friendly

## 📖 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Hardware Documentation](docs/hardware/hardware_documentation.md)**: Complete hardware specifications, schematics, and BOM
- **[Software Documentation](docs/software/software_documentation.md)**: Software architecture, API reference, and configuration
- **[Assembly Guide](docs/assembly/assembly_guide.md)**: Step-by-step assembly and installation instructions

## 📈 Specifications

### Measurement Ranges
- **Voltage**: 0-127V AC(RMS values)
- **Current**: 0-30A AC(RMS values)
- **Power**: Calculated (V × I)

### Accuracy
- **Voltage**: ±2%
- **Current**: ±3%
### Communication
- **Protocol**: HTTP/REST API
- **Connectivity**: WiFi 802.11 b/g/n (2.4GHz)
- **Update Rate**: Configurable (default 60s)

### Power Consumption
- **Operating**: <2W typical
- **Maximum**: <5W

## 🛠️ Installation

### Prerequisites
- Basic electronics knowledge
- Soldering skills
- Access to 3D printer (or order printed parts)
- PCB manufacturing (or order assembled PCB)

### Installation Steps
1. Manufacture or order PCB from KiCad files
2. 3D print enclosure from STL files
3. Assemble hardware components
4. Program ESP32 with firmware
5. Set up backend server
6. Deploy web frontend
7. Install system on PV installation

Detailed instructions: See [Assembly Guide](docs/assembly/assembly_guide.md)

## 🔒 Safety

**⚠️ WARNING**: This system monitors high-voltage DC circuits. Always:
- Follow local electrical codes
- Disconnect PV system before working
- Use proper safety equipment
- Have installations verified by qualified electrician
- Ensure proper grounding

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Areas for Contribution
- Hardware improvements
- Software features
- Documentation
- Bug fixes
- Testing

## 🌐 Use Cases

- Residential solar monitoring
- Commercial PV installations
- Off-grid systems
- Solar research and education
- Energy management systems

## 📞 Support

- **Documentation**: Check the `docs/` directory
- **Issues**: Open a GitHub issue
- **Questions**: Start a discussion

## 🎓 Educational Use

This project is suitable for:
- University projects
- Maker communities
- IoT learning
- Renewable energy education
- Electronics and programming courses

## 🔄 Roadmap

Future enhancements planned:
- [ ] Mobile application (iOS/Android)
- [ ] MQTT protocol support
- [ ] Multi-device management
- [ ] Cloud integration
- [ ] Machine learning predictions
- [ ] Email/SMS notifications
- [ ] Data export features

## 📊 Project Status

- ✅ Hardware design complete
- ✅ Firmware functional
- ✅ Backend operational
- ✅ Frontend deployed
- ✅ Documentation complete
- 🔄 Testing in progress

## 🙏 Acknowledgments

- ESP32 community
- KiCad development team
- Chart.js contributors
- Open source hardware/software communities

## 📜 Version History

- **v1.0.0** (2026-02-10): Initial release with complete system

---

**Made with ❤️ for renewable energy monitoring**
