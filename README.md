# 🧮 Premium Calc Pro

A feature-rich, premium calculator web application with multiple calculation modes, subscription plans, and a modern UI.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)]()

## 📋 Overview

**Premium Calc Pro** is a sophisticated web-based calculator that offers users three distinct calculation modes:

- **Normal Calculator** - Basic arithmetic operations
- **Engineering Calculator** - Advanced mathematical functions (trigonometry, logarithms, factorials)
- **Numeral Systems Calculator** - Convert between binary, octal, decimal, and hexadecimal

The application features a premium subscription model with multiple tiers, secure payment processing, and an intuitive user interface.

## ✨ Features

### Core Functionality
- ✅ Basic arithmetic operations (+, −, ×, ÷)
- ✅ Decimal point support
- ✅ Expression evaluation with proper order of operations
- ✅ Real-time display updates
- ✅ Clear and backspace functions

### Engineering Mode
- 📐 Trigonometric functions (sin, cos, tan)
- 📊 Logarithmic functions (log₁₀, ln)
- 🔢 Power and square root operations
- ❗ Factorial calculations
- 🎯 Mathematical constants (π, e)
- 🔲 Parentheses support for complex expressions

### Numeral Systems
- 🔄 Real-time conversion between number systems
- 📦 Binary (BIN) - Base 2
- 🔞 Octal (OCT) - Base 8
- 💯 Decimal (DEC) - Base 10
- 🔷 Hexadecimal (HEX) - Base 16
- 📋 Copy to clipboard functionality

### Payment & Subscription
- 💳 Secure payment processing with SMS verification
- 🎁 Multiple subscription tiers
- 💰 Monthly, yearly, and feature-specific plans
- 🛡️ Card management system
- 💾 Save payment methods for future transactions

### User Experience
- 🎨 Beautiful gradient-based UI design
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⌨️ Keyboard support for all input modes
- 🎯 Smooth animations and transitions
- 🌗 Professional color scheme

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Modern CSS with gradients and animations
- **Architecture**: Modular component-based structure
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)

## 📁 Project Structure

```
calc/
├── index.html                      # Main HTML file
├── README.md                       # Project documentation
├── PROJECT_STRUCTURE.md            # Detailed structure info
│
└── assets/
    ├── js/                         # JavaScript modules
    │   ├── calculator.js           # Core calculator functions
    │   ├── modes.js                # Mode switching & numeral systems
    │   ├── payment.js              # Payment & subscription logic
    │   ├── cards.js                # Payment card management
    │   ├── keyboard.js             # Keyboard input handling
    │   └── init.js                 # Application initialization
    │
    └── css/                        # Stylesheets
        ├── variables.css           # CSS variables & base styles
        ├── animations.css          # Keyframe animations
        ├── calculator.css          # Display styles
        ├── buttons.css             # Button styles
        ├── modals.css              # Modal window styles
        ├── inputs.css              # Input field styles
        ├── cards.css               # Payment card styles
        ├── plans.css               # Subscription plan styles
        ├── numeral.css             # Numeral system styles
        └── responsive.css          # Mobile responsiveness
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No additional installations required

### Installation

1. **Clone or download the project**
```bash
git clone https://github.com/yourusername/premium-calc-pro.git
cd premium-calc-pro
```

2. **Open in browser**
```bash
# Simply open index.html in your browser
# Or use a local server (recommended)
python -m http.server 8000
# Then navigate to http://localhost:8000
```

## 📖 Usage

### Basic Calculator Mode
1. Click the **"Обычный"** (Normal) button to activate normal mode
2. Enter numbers and operators
3. Use **C** to clear or **Backspace** to delete
4. Press **=** or **Enter** to calculate

### Engineering Calculator Mode
1. Click the **"Инженерный"** (Engineering) button
2. Use advanced functions:
   - **Trigonometric**: sin, cos, tan
   - **Logarithmic**: log, ln
   - **Special**: x^y (power), √x (square root), x! (factorial)
3. Use **π** and **e** for mathematical constants

### Numeral Systems Mode
1. Click the **"Системы счисления"** (Numeral Systems) button
2. Select your input format: BIN, OCT, DEC, or HEX
3. Enter the value
4. Click **"Конвертировать"** (Convert)
5. View results in all four number systems
6. Use **📋 Copy** to copy hexadecimal value

### Keyboard Shortcuts

#### All Modes
| Key | Action |
|-----|--------|
| `0-9` | Enter digit |
| `.` | Decimal point |
| `+`, `-`, `*`, `/` | Operators |
| `Enter` | Calculate |
| `Backspace` | Delete last character |
| `C` / `Esc` | Clear display |

#### Engineering Mode
| Key | Action |
|-----|--------|
| `(` `)` | Parentheses |
| `Shift+9` / `Shift+0` | Parentheses (alternative) |

## 💳 Subscription Plans

| Plan | Price | Features |
|------|-------|----------|
| **Monthly** | $20/month | Basic calculator, powers, roots, percentages |
| **Yearly** | $200/year | All basic features + 50% savings |
| **Engineering** | $300/year | Engineering mode + all basic features |
| **Programmer** | $250/year | Numeral systems conversion |
| **Super Plan** | $500/year | 🏆 All features + 28% savings |

## 🔒 Security

- **No server-side storage** - All calculations happen locally
- **Secure payment simulation** - SMS verification for transactions
- **Card safety** - Payment information is not persisted
- **Privacy-first** - No analytics or tracking

## 🎨 Customization

### Changing Colors

Edit CSS variables in `assets/css/variables.css`:

```css
:root {
    --primary-color: #D4A574;
    --secondary-color: #C19A6B;
    --light-bg: #F5F1E8;
    /* ... other variables */
}
```

### Adding New Features

1. Create a new JavaScript file in `assets/js/`
2. Create corresponding styles in `assets/css/` if needed
3. Import files in `index.html`
4. Follow existing code patterns and naming conventions

## 📱 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Full support |
| Firefox | Latest | ✅ Full support |
| Safari | Latest | ✅ Full support |
| Edge | Latest | ✅ Full support |
| IE 11 | - | ⚠️ Not supported |

## 🐛 Known Limitations

- Payment processing is simulated for demo purposes
- Results are calculated client-side only
- Very large numbers may have floating-point precision issues
- Offline functionality is supported

## 📝 Future Enhancements

- [ ] Real payment gateway integration (Stripe, PayPal)
- [ ] User accounts and history
- [ ] Scientific notation support
- [ ] Matrix calculations
- [ ] Statistics mode
- [ ] Custom keyboard layout support
- [ ] Dark/Light theme toggle
- [ ] Multi-language support (beyond Russian)
- [ ] PWA capabilities for offline use
- [ ] Calculation history

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created with ❤️ by the development team.

## 📧 Support

For issues, questions, or suggestions:
- 📌 Open an issue on GitHub
- 💬 Check existing discussions
- 🐛 Report bugs with detailed information

## 🙏 Acknowledgments

- Inspired by modern web design principles
- Built with vanilla JavaScript for maximum compatibility
- UI design inspired by professional calculator applications
- Special thanks to all contributors and users

---

**Made with ❤️ | Version 1.0.0 | 2024**