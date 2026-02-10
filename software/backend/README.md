# PV Monitoring System - Backend

Node.js backend server for the PV Monitoring System. Receives data from ESP32 devices and provides REST API for frontend.

## Features

- RESTful API for data collection and retrieval
- SQLite database for data storage
- Real-time monitoring data
- Historical data analysis
- Alert system for abnormal conditions
- Statistics calculation (daily, weekly, monthly)
- CORS enabled for cross-origin requests

## Requirements

- Node.js 14.0 or higher
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

### Data Collection
```
POST /api/data
Content-Type: application/json

{
  "voltage": 24.5,
  "current": 3.2,
  "power": 78.4,
  "temperature": 28.5
}
```
Receives data from ESP32 device.

### Get Latest Reading
```
GET /api/readings/latest
```
Returns the most recent sensor reading.

### Get Historical Data
```
GET /api/readings?limit=100&offset=0
```
Returns historical readings with pagination.

Parameters:
- `limit`: Number of records to return (default: 100)
- `offset`: Offset for pagination (default: 0)

### Get Data by Time Range
```
GET /api/readings/range?start=2024-01-01T00:00:00Z&end=2024-01-31T23:59:59Z
```
Returns readings within specified time range.

Parameters:
- `start`: Start timestamp (ISO 8601 format)
- `end`: End timestamp (ISO 8601 format)

### Get Statistics
```
GET /api/stats?period=day
```
Returns statistical analysis for specified period.

Parameters:
- `period`: Time period (day, week, month)

Response includes:
- Average, max, min voltage
- Average, max current
- Average, max power
- Total energy (kWh)
- Average, max temperature

### Get Alerts
```
GET /api/alerts?acknowledged=false
```
Returns system alerts.

Parameters:
- `acknowledged`: Filter by acknowledgment status (true/false)

### Acknowledge Alert
```
PUT /api/alerts/:id/acknowledge
```
Mark an alert as acknowledged.

## Database Schema

### readings table
- `id`: Primary key
- `voltage`: Voltage reading (V)
- `current`: Current reading (A)
- `power`: Power reading (W)
- `temperature`: Temperature reading (°C)
- `timestamp`: Timestamp of reading

### alerts table
- `id`: Primary key
- `alert_type`: Type of alert
- `message`: Alert message
- `severity`: Alert severity (warning, critical)
- `timestamp`: When alert was created
- `acknowledged`: Whether alert has been acknowledged

## Alert Thresholds

The system generates alerts for:
- High voltage (> 35V)
- Low voltage (< 10V)
- High temperature (> 60°C)

Adjust thresholds in `server.js` in the `checkAlerts()` function.

## Configuration

### Port
Set via environment variable:
```bash
PORT=8080 npm start
```

### Database Location
The SQLite database is stored at `./monitoring.db` by default.

## Development

### Project Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── monitoring.db      # SQLite database (created on first run)
└── README.md         # This file
```

### Adding New Features
1. Add new routes in `server.js`
2. Update database schema if needed
3. Test with REST client (Postman, curl, etc.)

## Testing

Test the API with curl:

```bash
# Health check
curl http://localhost:3000/api/health

# Send test data
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"voltage": 24.5, "current": 3.2, "power": 78.4, "temperature": 28.5}'

# Get latest reading
curl http://localhost:3000/api/readings/latest

# Get statistics
curl http://localhost:3000/api/stats?period=day
```

## Production Deployment

For production deployment:
1. Use a process manager (PM2, systemd)
2. Set up reverse proxy (nginx)
3. Enable HTTPS
4. Configure firewall
5. Set up monitoring and logging
6. Consider migrating to PostgreSQL for better performance

Example with PM2:
```bash
npm install -g pm2
pm2 start server.js --name pv-monitoring
pm2 save
pm2 startup
```

## License

MIT License
