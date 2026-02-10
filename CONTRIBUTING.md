# Contributing to PV Monitoring System

Thank you for considering contributing to the PV Monitoring System! This document provides guidelines for contributing to the project.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version, etc.)
- **Hardware version** if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear title**
- **Provide detailed description** of the proposed feature
- **Explain why** this enhancement would be useful
- **List any alternatives** you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the coding standards below
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request**

## Development Setup

### Hardware Development

1. Install KiCad 6.0 or later
2. Open the project in `hardware/pcb/kicad/`
3. Make your changes
4. Export schematics and generate Gerber files for review

### Firmware Development

1. Install PlatformIO or Arduino IDE
2. Navigate to `software/firmware/`
3. Make your changes
4. Test on actual hardware
5. Ensure code compiles without warnings

### Backend Development

1. Install Node.js 14+
2. Navigate to `software/backend/`
3. Run `npm install`
4. Make your changes
5. Test with `npm test` (if tests exist)
6. Verify API endpoints work correctly

### Frontend Development

1. Navigate to `software/frontend/`
2. Make your changes
3. Test in multiple browsers
4. Verify responsive design

## Coding Standards

### Firmware (C++)

- Follow Arduino style guide
- Use meaningful variable names
- Comment complex logic
- Keep functions focused and small
- Use const for constants

Example:
```cpp
// Good
const int VOLTAGE_PIN = 34;
float readVoltage() {
  int raw = analogRead(VOLTAGE_PIN);
  return raw * VOLTAGE_MULTIPLIER;
}

// Bad
int vp = 34;
float rv() {
  return analogRead(vp) * 0.0128;
}
```

### Backend (JavaScript)

- Use ES6+ features
- Follow Airbnb JavaScript Style Guide
- Use async/await for asynchronous code
- Add error handling
- Use meaningful names

Example:
```javascript
// Good
async function getLatestReading() {
  try {
    const reading = await db.get('SELECT * FROM readings ORDER BY timestamp DESC LIMIT 1');
    return reading;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

// Bad
function glr(cb) {
  db.get('SELECT * FROM readings ORDER BY timestamp DESC LIMIT 1', cb);
}
```

### Frontend (JavaScript)

- Use modern JavaScript (ES6+)
- Keep functions small and focused
- Use meaningful variable names
- Add comments for complex logic
- Follow consistent formatting

### Documentation

- Use clear, concise language
- Include code examples where helpful
- Update README if adding features
- Add inline comments for complex code
- Keep documentation up-to-date

## Testing

### Hardware Testing

- Test on actual hardware before submitting
- Document test procedures
- Include photos/screenshots of results

### Software Testing

- Test all API endpoints
- Verify database operations
- Test error handling
- Check edge cases
- Test on multiple browsers/devices

## Commit Messages

Write clear commit messages:

```
Good:
- "Add temperature alert threshold configuration"
- "Fix voltage reading calibration issue"
- "Update API documentation for stats endpoint"

Bad:
- "fix bug"
- "update"
- "changes"
```

Format:
```
Short summary (50 chars or less)

More detailed explanation if needed. Wrap at 72 characters.
Explain what and why, not how.

- Bullet points are okay
- Reference issues: Fixes #123
```

## Project Structure

Maintain the existing structure:

```
hardware/          - All hardware designs
software/          - All software code
docs/             - Documentation
```

## Code Review Process

1. All submissions require review
2. Maintainers will review within 1-2 weeks
3. Address feedback promptly
4. Once approved, maintainers will merge

## Community Guidelines

- Be respectful and inclusive
- Help others learn
- Accept constructive criticism
- Focus on the best solution
- Have fun!

## Questions?

Open an issue for questions or start a discussion.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the PV Monitoring System! 🌞
