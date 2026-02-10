const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database setup
const dbPath = path.join(__dirname, 'monitoring.db');
const db = new sqlite3.Database(dbPath);

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voltage REAL,
    current REAL,
    power REAL,
    temperature REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alert_type TEXT,
    message TEXT,
    severity TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    acknowledged BOOLEAN DEFAULT 0
  )`);
});

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Receive data from ESP32
app.post('/api/data', (req, res) => {
  const { voltage, current, power, temperature } = req.body;
  
  // Validate input
  if (voltage === undefined || current === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Insert into database
  const stmt = db.prepare('INSERT INTO readings (voltage, current, power, temperature) VALUES (?, ?, ?, ?)');
  stmt.run(voltage, current, power, temperature, (err) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Check for alerts
    checkAlerts({ voltage, current, power, temperature });
    
    res.json({ 
      success: true, 
      message: 'Data received',
      timestamp: new Date().toISOString()
    });
  });
  stmt.finalize();
});

// Get latest readings
app.get('/api/readings/latest', (req, res) => {
  db.get('SELECT * FROM readings ORDER BY timestamp DESC LIMIT 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(row || {});
  });
});

// Get historical data
app.get('/api/readings', (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const offset = parseInt(req.query.offset) || 0;
  
  db.all(
    'SELECT * FROM readings ORDER BY timestamp DESC LIMIT ? OFFSET ?',
    [limit, offset],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Get readings by time range
app.get('/api/readings/range', (req, res) => {
  const { start, end } = req.query;
  
  if (!start || !end) {
    return res.status(400).json({ error: 'Start and end timestamps required' });
  }
  
  db.all(
    'SELECT * FROM readings WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp ASC',
    [start, end],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Get statistics
app.get('/api/stats', (req, res) => {
  const period = req.query.period || 'day'; // day, week, month
  let timeFilter = '';
  
  switch(period) {
    case 'day':
      timeFilter = "datetime('now', '-1 day')";
      break;
    case 'week':
      timeFilter = "datetime('now', '-7 days')";
      break;
    case 'month':
      timeFilter = "datetime('now', '-30 days')";
      break;
  }
  
  db.get(`
    SELECT 
      AVG(voltage) as avg_voltage,
      MAX(voltage) as max_voltage,
      MIN(voltage) as min_voltage,
      AVG(current) as avg_current,
      MAX(current) as max_current,
      AVG(power) as avg_power,
      MAX(power) as max_power,
      SUM(power) / 3600 as energy_kwh,
      AVG(temperature) as avg_temperature,
      MAX(temperature) as max_temperature
    FROM readings
    WHERE timestamp >= ${timeFilter}
  `, (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(row || {});
  });
});

// Get alerts
app.get('/api/alerts', (req, res) => {
  const acknowledged = req.query.acknowledged === 'true' ? 1 : 0;
  
  db.all(
    'SELECT * FROM alerts WHERE acknowledged = ? ORDER BY timestamp DESC LIMIT 50',
    [acknowledged],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Acknowledge alert
app.put('/api/alerts/:id/acknowledge', (req, res) => {
  const { id } = req.params;
  
  db.run(
    'UPDATE alerts SET acknowledged = 1 WHERE id = ?',
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true });
    }
  );
});

// Helper function to check for alerts
function checkAlerts(data) {
  const alerts = [];
  
  // High voltage alert
  if (data.voltage > 35) {
    alerts.push({
      type: 'high_voltage',
      message: `High voltage detected: ${data.voltage}V`,
      severity: 'warning'
    });
  }
  
  // Low voltage alert
  if (data.voltage < 10 && data.voltage > 0) {
    alerts.push({
      type: 'low_voltage',
      message: `Low voltage detected: ${data.voltage}V`,
      severity: 'warning'
    });
  }
  
  // High temperature alert
  if (data.temperature > 60) {
    alerts.push({
      type: 'high_temperature',
      message: `High temperature: ${data.temperature}°C`,
      severity: 'critical'
    });
  }
  
  // Insert alerts into database
  alerts.forEach(alert => {
    const stmt = db.prepare('INSERT INTO alerts (alert_type, message, severity) VALUES (?, ?, ?)');
    stmt.run(alert.type, alert.message, alert.severity);
    stmt.finalize();
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`PV Monitoring Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    }
    process.exit(0);
  });
});
