# PV Monitoring System - Frontend

Modern web interface for visualizing PV monitoring system data.

## Features

- Real-time data display
- Historical data visualization with charts
- Statistics dashboard (daily, weekly, monthly)
- Alert monitoring
- Responsive design for mobile and desktop
- Auto-refreshing data

## Technology Stack

- HTML5
- CSS3 (with modern gradients and animations)
- Vanilla JavaScript
- Chart.js for data visualization

## Installation

### Standalone Deployment

1. Copy all files to a web server directory
2. Update the API endpoint in `app.js`:
   ```javascript
   const API_BASE_URL = 'http://your-server-address:3000/api';
   ```
3. Open `index.html` in a web browser

### Integrated with Backend

1. Copy files to the backend's `public` folder:
   ```bash
   cp -r frontend/* backend/public/
   ```
2. Start the backend server (it will serve the frontend automatically)
3. Access at `http://localhost:3000`

## Configuration

### API Endpoint

Edit `app.js` to configure the backend API URL:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

### Update Interval

Change the data refresh interval:

```javascript
const UPDATE_INTERVAL = 5000; // milliseconds (5 seconds)
```

## Usage

### Dashboard View

The main dashboard shows:
- **Current Readings**: Real-time voltage, current, power, and temperature
- **Statistics**: Aggregate data for selected time period
- **Power Chart**: Visual representation of power generation over time
- **Alerts**: System alerts and warnings

### Time Period Selection

Click buttons to view statistics for different periods:
- Today
- This Week
- This Month

### Real-time Updates

The interface automatically:
- Updates readings every 5 seconds
- Refreshes the power chart
- Checks for new alerts every 30 seconds

## Customization

### Colors

Edit `style.css` to customize the color scheme. Main gradient colors are defined in:
- `.reading-card.voltage` - Voltage card colors
- `.reading-card.current` - Current card colors
- `.reading-card.power` - Power card colors
- `.reading-card.temperature` - Temperature card colors

### Chart Configuration

Modify chart settings in `app.js` in the `initChart()` function:

```javascript
powerChart = new Chart(ctx, {
    type: 'line',  // Change chart type
    options: {
        // Customize options
    }
});
```

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Mobile Support

The interface is fully responsive and optimized for:
- Smartphones (portrait and landscape)
- Tablets
- Desktop displays

## Development

### Local Development Server

For development, you can use any static file server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then access at `http://localhost:8000`

### CORS Issues

If you encounter CORS issues during development:
1. Ensure the backend has CORS enabled (already configured in backend)
2. Use a browser extension to bypass CORS for development
3. Serve frontend from the same domain as backend

## Troubleshooting

### "Connection Error" Status

- Verify backend server is running
- Check API_BASE_URL is correct
- Ensure no firewall is blocking the connection
- Check browser console for error messages

### Chart Not Displaying

- Ensure Chart.js CDN is accessible
- Check browser console for JavaScript errors
- Verify historical data exists in database

### Data Not Updating

- Check UPDATE_INTERVAL setting
- Verify ESP32 is sending data to backend
- Check browser network tab for failed API requests

## Performance

The interface is optimized for:
- Low memory usage
- Minimal API calls
- Smooth animations
- Fast rendering

## Security

For production deployment:
- Use HTTPS for all connections
- Implement authentication
- Sanitize all user inputs
- Use Content Security Policy headers

## License

MIT License
