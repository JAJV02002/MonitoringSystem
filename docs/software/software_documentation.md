# Software Documentation

## PV Monitoring System Software Architecture

This document describes the software architecture and components of the PV Monitoring System.

## System Architecture

The system follows a three-tier architecture:

```
┌─────────────┐
│  Frontend   │  (Web UI - HTML/CSS/JS)
│  (Browser)  │
└──────┬──────┘
       │ HTTP/REST
       │
┌──────▼──────┐
│   Backend   │  (Node.js + Express)
│   Server    │
└──────┬──────┘
       │ HTTP/JSON
       │
┌──────▼──────┐
│  Firmware   │  (ESP32 - Arduino)
│   (ESP32)   │
└──────┬──────┘
       │
┌──────▼──────┐
│   Sensors   │  (Voltage, Current, Temp)
│  Hardware   │
└─────────────┘
```

## Components

### 1. Firmware (ESP32)

**Technology Stack:**
- Language: C++ (Arduino framework)
- Platform: ESP32 (Espressif)
- IDE: PlatformIO / Arduino IDE

**Key Features:**
- Sensor data acquisition
- WiFi connectivity
- HTTP client for data transmission
- JSON data formatting
- Real-time monitoring

**Architecture:**

```cpp
main.cpp
├── setup()
│   ├── WiFi initialization
│   ├── Sensor initialization
│   └── Pin configuration
│
└── loop()
    ├── readSensors()
    ├── displayReadings()
    └── sendDataToServer()
```

**Data Flow:**
1. Read analog values from sensors
2. Apply calibration formulas
3. Calculate derived values (power)
4. Format data as JSON
5. Send via HTTP POST
6. Handle response and errors

**Configuration:**
- WiFi credentials (SSID, password)
- Server endpoint URL
- Sensor calibration constants
- Update intervals

### 2. Backend Server (Node.js)

**Technology Stack:**
- Runtime: Node.js
- Framework: Express.js
- Database: SQLite3
- API: RESTful

**Key Features:**
- REST API endpoints
- Data persistence
- Statistical analysis
- Alert generation
- CORS support

**Architecture:**

```javascript
server.js
├── Express app configuration
├── Database initialization
├── API Routes
│   ├── POST /api/data          (receive sensor data)
│   ├── GET /api/readings       (query historical data)
│   ├── GET /api/stats          (calculate statistics)
│   └── GET /api/alerts         (query alerts)
│
└── Business Logic
    ├── checkAlerts()           (alert generation)
    └── Database operations
```

**Database Schema:**

```sql
-- readings table
CREATE TABLE readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voltage REAL,
    current REAL,
    power REAL,
    temperature REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- alerts table
CREATE TABLE alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alert_type TEXT,
    message TEXT,
    severity TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    acknowledged BOOLEAN DEFAULT 0
);
```

### 3. Frontend (Web UI)

**Technology Stack:**
- HTML5
- CSS3 (modern features)
- Vanilla JavaScript (ES6+)
- Chart.js (visualization)

**Key Features:**
- Real-time data display
- Historical data visualization
- Statistics dashboard
- Alert monitoring
- Responsive design

**Architecture:**

```javascript
app.js
├── Initialization
│   ├── initChart()
│   ├── startDataPolling()
│   └── Event listeners
│
├── Data Management
│   ├── updateLatestReading()
│   ├── loadHistoricalData()
│   ├── loadStats()
│   └── loadAlerts()
│
└── UI Updates
    ├── updateReadingDisplay()
    ├── updateChartData()
    ├── updateStatsDisplay()
    └── displayAlerts()
```

## Data Models

### Sensor Reading

```json
{
  "voltage": 24.5,          // Volts (V)
  "current": 3.2,           // Amperes (A)
  "power": 78.4,            // Watts (W)
  "temperature": 28.5,      // Celsius (°C)
  "timestamp": 1234567890   // Unix timestamp (ms)
}
```

### Alert

```json
{
  "id": 1,
  "alert_type": "high_voltage",
  "message": "High voltage detected: 35.2V",
  "severity": "warning",    // "warning" or "critical"
  "timestamp": "2024-01-01T12:00:00Z",
  "acknowledged": false
}
```

### Statistics

```json
{
  "avg_voltage": 24.3,
  "max_voltage": 28.5,
  "min_voltage": 20.1,
  "avg_current": 3.1,
  "max_current": 5.2,
  "avg_power": 75.3,
  "max_power": 148.2,
  "energy_kwh": 1.85,
  "avg_temperature": 27.8,
  "max_temperature": 32.1
}
```

## API Documentation

### POST /api/data

Receive sensor data from ESP32.

**Request:**
```http
POST /api/data HTTP/1.1
Content-Type: application/json

{
  "voltage": 24.5,
  "current": 3.2,
  "power": 78.4,
  "temperature": 28.5
}
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Data received",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### GET /api/readings/latest

Get the most recent sensor reading.

**Response:**
```json
{
  "id": 1234,
  "voltage": 24.5,
  "current": 3.2,
  "power": 78.4,
  "temperature": 28.5,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### GET /api/readings

Get historical readings with pagination.

**Query Parameters:**
- `limit` (default: 100): Number of records
- `offset` (default: 0): Pagination offset

**Response:**
```json
[
  {
    "id": 1234,
    "voltage": 24.5,
    "current": 3.2,
    "power": 78.4,
    "temperature": 28.5,
    "timestamp": "2024-01-01T12:00:00Z"
  },
  ...
]
```

### GET /api/stats

Get statistical analysis.

**Query Parameters:**
- `period`: "day", "week", or "month"

**Response:**
```json
{
  "avg_voltage": 24.3,
  "max_voltage": 28.5,
  "avg_power": 75.3,
  "energy_kwh": 1.85,
  ...
}
```

## Configuration

### Firmware Configuration

Edit `main.cpp`:

```cpp
// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Server configuration
const char* serverUrl = "http://your-server.com/api/data";

// Calibration constants
#define VOLTAGE_MULTIPLIER 0.0128
#define CURRENT_OFFSET 2.5
#define CURRENT_SENSITIVITY 0.185

// Update interval
const unsigned long sendInterval = 60000; // 60 seconds
```

### Backend Configuration

Set environment variables:

```bash
PORT=3000                  # Server port
NODE_ENV=production        # Environment
```

### Frontend Configuration

Edit `app.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
const UPDATE_INTERVAL = 5000; // 5 seconds
```

## Deployment

### Firmware Deployment

1. **Using PlatformIO:**
```bash
cd software/firmware
pio run --target upload
```

2. **Using Arduino IDE:**
   - Open `main.cpp`
   - Select ESP32 board
   - Click Upload

### Backend Deployment

1. **Development:**
```bash
cd software/backend
npm install
npm run dev
```

2. **Production:**
```bash
npm install --production
npm start
```

3. **Using PM2:**
```bash
npm install -g pm2
pm2 start server.js --name pv-monitoring
pm2 save
pm2 startup
```

### Frontend Deployment

1. **Standalone:**
   - Copy files to web server
   - Update API endpoint

2. **With Backend:**
   - Copy to `backend/public/`
   - Access via backend server

## Security Considerations

### Firmware

1. **WiFi Security:**
   - Use WPA2/WPA3 encryption
   - Don't hardcode credentials in production
   - Consider using WiFi Manager

2. **Communication:**
   - Use HTTPS for production
   - Implement API authentication
   - Validate SSL certificates

### Backend

1. **API Security:**
   - Implement authentication (JWT, API keys)
   - Rate limiting
   - Input validation
   - SQL injection prevention

2. **Database:**
   - Regular backups
   - Access control
   - Encryption at rest

### Frontend

1. **Browser Security:**
   - HTTPS only
   - Content Security Policy
   - XSS prevention
   - CSRF protection

## Error Handling

### Firmware

```cpp
// WiFi connection retry
int retries = 0;
while (WiFi.status() != WL_CONNECTED && retries < 20) {
    delay(500);
    retries++;
}
if (WiFi.status() != WL_CONNECTED) {
    // Handle error: restart, log, LED indication
}

// HTTP error handling
int httpCode = http.POST(jsonString);
if (httpCode > 0) {
    // Success
} else {
    // Log error, retry, or store locally
}
```

### Backend

```javascript
// Database error handling
db.run(query, params, (err) => {
    if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
            error: 'Database error' 
        });
    }
    // Success
});

// Input validation
if (!voltage || !current) {
    return res.status(400).json({ 
        error: 'Missing required fields' 
    });
}
```

### Frontend

```javascript
// Network error handling
try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Process data
} catch (error) {
    console.error('Error:', error);
    updateStatus('error');
}
```

## Testing

### Unit Tests

Not currently implemented. Consider adding:
- Firmware: PlatformIO unit tests
- Backend: Jest or Mocha tests
- Frontend: Jest tests

### Integration Tests

Manual testing checklist:
1. ✓ Firmware connects to WiFi
2. ✓ Sensors read correctly
3. ✓ Data sent to server
4. ✓ Backend stores data
5. ✓ Frontend displays data
6. ✓ Alerts generated correctly

### Load Testing

Use tools like:
- Apache JMeter
- Artillery
- k6

Example test scenario:
- 10 devices sending data every 60s
- Expected: 10 req/min
- Database size: ~1MB per day

## Performance Optimization

### Firmware

- Reduce WiFi reconnection time
- Implement sleep modes
- Batch data transmission
- Use MQTT instead of HTTP

### Backend

- Database indexing
- Query optimization
- Caching frequently accessed data
- Connection pooling

### Frontend

- Lazy loading
- Code minification
- Asset compression
- Service workers for offline support

## Monitoring and Logging

### Firmware Logs

Available via Serial Monitor:
```
PV Monitoring System initialized
=== PV System Status ===
Voltage: 24.50 V
Current: 3.20 A
Power: 78.40 W
Temperature: 28.5 °C
Data sent successfully. Response code: 200
```

### Backend Logs

Console output:
```
PV Monitoring Server running on port 3000
Data received: voltage=24.5V, current=3.2A
Alert generated: High temperature 62°C
```

Consider adding:
- Winston for structured logging
- Log rotation
- Error tracking (Sentry)

## Maintenance

### Regular Tasks

1. **Daily:**
   - Monitor system status
   - Check for alerts

2. **Weekly:**
   - Review statistics
   - Check disk space
   - Verify data integrity

3. **Monthly:**
   - Database backup
   - Log rotation
   - Update dependencies

4. **Quarterly:**
   - Security updates
   - Performance review
   - Capacity planning

## Troubleshooting

### Common Issues

1. **Firmware not connecting:**
   - Check WiFi credentials
   - Verify network availability
   - Check ESP32 power supply

2. **No data in backend:**
   - Check endpoint URL
   - Verify network connectivity
   - Check server logs

3. **Frontend not updating:**
   - Check browser console
   - Verify API endpoint
   - Check CORS settings

## Future Enhancements

1. **Features:**
   - Mobile app (React Native)
   - Email/SMS alerts
   - Data export (CSV, Excel)
   - Multi-device support
   - Historical data comparison

2. **Technical:**
   - MQTT protocol
   - Database migration to PostgreSQL
   - Containerization (Docker)
   - Kubernetes deployment
   - CI/CD pipeline

3. **Security:**
   - User authentication
   - Role-based access control
   - Encrypted data storage
   - Audit logging

## License

MIT License

## Support

For issues and questions:
- GitHub Issues
- Email support
- Documentation wiki
