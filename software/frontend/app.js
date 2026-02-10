// Configuration
const API_BASE_URL = 'http://localhost:3000/api';
const UPDATE_INTERVAL = 5000; // 5 seconds

// State
let currentPeriod = 'day';
let powerChart = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    startDataPolling();
    loadStats('day');
    loadAlerts();
});

// Start polling for data
function startDataPolling() {
    updateLatestReading();
    setInterval(updateLatestReading, UPDATE_INTERVAL);
}

// Update latest reading
async function updateLatestReading() {
    try {
        const response = await fetch(`${API_BASE_URL}/readings/latest`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        
        if (data && data.voltage !== undefined) {
            updateReadingDisplay(data);
            updateChartData(data);
            updateStatus('connected');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        updateStatus('error');
    }
}

// Update reading display
function updateReadingDisplay(data) {
    document.getElementById('voltage').textContent = data.voltage ? data.voltage.toFixed(2) : '--';
    document.getElementById('current').textContent = data.current ? data.current.toFixed(2) : '--';
    document.getElementById('power').textContent = data.power ? data.power.toFixed(2) : '--';
    document.getElementById('temperature').textContent = data.temperature ? data.temperature.toFixed(1) : '--';
    
    const lastUpdate = new Date(data.timestamp);
    document.getElementById('lastUpdate').textContent = lastUpdate.toLocaleTimeString();
}

// Update status indicator
function updateStatus(status) {
    const statusElement = document.getElementById('status');
    const statusText = document.getElementById('statusText');
    
    statusElement.className = `status ${status}`;
    
    switch(status) {
        case 'connected':
            statusText.textContent = 'Connected';
            break;
        case 'error':
            statusText.textContent = 'Connection Error';
            break;
        default:
            statusText.textContent = 'Connecting...';
    }
}

// Load statistics
async function loadStats(period) {
    currentPeriod = period;
    
    // Update active button
    document.querySelectorAll('.stats-controls button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${period}`).classList.add('active');
    
    try {
        const response = await fetch(`${API_BASE_URL}/stats?period=${period}`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        
        const stats = await response.json();
        updateStatsDisplay(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

// Update statistics display
function updateStatsDisplay(stats) {
    document.getElementById('avgVoltage').textContent = 
        stats.avg_voltage ? stats.avg_voltage.toFixed(2) + ' V' : '--';
    document.getElementById('maxPower').textContent = 
        stats.max_power ? stats.max_power.toFixed(2) + ' W' : '--';
    document.getElementById('energyKwh').textContent = 
        stats.energy_kwh ? stats.energy_kwh.toFixed(3) + ' kWh' : '--';
    document.getElementById('avgTemp').textContent = 
        stats.avg_temperature ? stats.avg_temperature.toFixed(1) + ' °C' : '--';
}

// Initialize chart
function initChart() {
    const ctx = document.getElementById('powerChart').getContext('2d');
    
    powerChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Power (W)',
                data: [],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Power (W)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                }
            }
        }
    });
    
    loadHistoricalData();
}

// Load historical data for chart
async function loadHistoricalData() {
    try {
        const response = await fetch(`${API_BASE_URL}/readings?limit=20`);
        if (!response.ok) throw new Error('Failed to fetch historical data');
        
        const readings = await response.json();
        
        if (readings && readings.length > 0) {
            // Reverse to show oldest first
            readings.reverse();
            
            const labels = readings.map(r => {
                const time = new Date(r.timestamp);
                return time.toLocaleTimeString();
            });
            
            const data = readings.map(r => r.power || 0);
            
            powerChart.data.labels = labels;
            powerChart.data.datasets[0].data = data;
            powerChart.update();
        }
    } catch (error) {
        console.error('Error loading historical data:', error);
    }
}

// Update chart with new data
function updateChartData(newReading) {
    if (!powerChart) return;
    
    const time = new Date(newReading.timestamp);
    const label = time.toLocaleTimeString();
    
    // Add new data point
    powerChart.data.labels.push(label);
    powerChart.data.datasets[0].data.push(newReading.power || 0);
    
    // Keep only last 20 points
    if (powerChart.data.labels.length > 20) {
        powerChart.data.labels.shift();
        powerChart.data.datasets[0].data.shift();
    }
    
    powerChart.update('none'); // Update without animation
}

// Load alerts
async function loadAlerts() {
    try {
        const response = await fetch(`${API_BASE_URL}/alerts?acknowledged=false`);
        if (!response.ok) throw new Error('Failed to fetch alerts');
        
        const alerts = await response.json();
        displayAlerts(alerts);
    } catch (error) {
        console.error('Error loading alerts:', error);
    }
}

// Display alerts
function displayAlerts(alerts) {
    const alertsList = document.getElementById('alertsList');
    
    if (!alerts || alerts.length === 0) {
        alertsList.innerHTML = '<p class="no-alerts">No alerts</p>';
        return;
    }
    
    alertsList.innerHTML = alerts.map(alert => `
        <div class="alert-item ${alert.severity}">
            <div class="alert-header">
                <span class="alert-message">${alert.message}</span>
                <span class="alert-time">${new Date(alert.timestamp).toLocaleString()}</span>
            </div>
        </div>
    `).join('');
}

// Reload alerts periodically
setInterval(loadAlerts, 30000); // Every 30 seconds
