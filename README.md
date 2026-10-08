# Font Switcher Widget

[![Callijatra Foundation](https://img.shields.io/badge/Callijatra-Foundation-c0392b.svg)](https://callijatra.github.io)
[![License: Open Source](https://img.shields.io/badge/License-Open%20Source-blue.svg)](LICENSE)
[![Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://callijatra.github.io/newa-font-switch-widget/demo)

A standalone, easy-to-distribute web font switcher widget developed by **[Callijatra Foundation](https://callijatra.github.io)**. It allows users to switch between **Original Devanagari**, **Nithya Ranjana**, **Nepal Lipi "Aakha"**, and **Noto Sans Newa** fonts on any webpage.

---

## 🌟 Live Interactive Links

- **[Homepage & Interactive Sandbox](https://callijatra.github.io/newa-font-switch-widget/)** — Explore live multi-script comparisons, generate custom code snippets, and review technical specs.
- **[Live Demo Page](https://callijatra.github.io/newa-font-switch-widget/demo/)** — Test font switching on real-world Nepalbhasa news articles and literary text.
- **[Transliteration Keyboard](https://callijatra.github.io/newa-font-switch-widget/demo/transliterate.html)** — Type Romanized English to generate Devanagari and Nepal Lipi (Newa) script with dictionary suggestions.

---

## 🚀 Quick Start

### 1. Include CSS and JavaScript

Add the stylesheet to your `<head>` and the script before `</body>`:

```html
<!-- Include Font Switcher Widget CSS -->
<link rel="stylesheet" href="css/font-switcher.css">

<!-- Include Font Switcher Widget JavaScript -->
<script src="js/font-switcher.js"></script>

<!-- Initialize Widget -->
<script>
  FontSwitcher.init({
    targetClasses: ['newa-content']
  });
</script>
```

### 2. Mark Target Content Elements

Add the `newa-content` class to elements you want affected by font switching:

```html
<div class="newa-content">
  <h2>अःपुगु ‘नित्या रञ्जना’ लिपिया युनिकोड फन्ट सार्वजनिक</h2>
  <p>येँ (नेपालभाषा टाइम्स) — विश्वया हे सुन्दर लिपि कथं नांजाःगु रञ्जना लिपिया न्हूगु युनिकोड फन्ट सार्वजनिक जूगु दु ।</p>
</div>
```

---

## ⚙️ Configuration Options

Customize widget behavior by passing an options object to `FontSwitcher.init(options)`:

```javascript
FontSwitcher.init({
  targetClasses: ['newa-content', 'article-text'], // Array of target CSS class names
  container: '#main-nav',                          // CSS selector or DOM element to insert widget into (null = floating top-right)
  backgroundColor: '#2c3e50',                      // Custom background color (auto-adjusts text contrast)
  autoLoad: true                                   // Auto-load Noto Sans Newa from Google Fonts
});
```

### Options Reference Table

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `targetClasses` | `Array` | `null` | Array of class names (without leading dot). Takes precedence over `targetSelector`. |
| `targetSelector` | `String` | `'body'` | CSS selector for target elements when `targetClasses` is omitted. |
| `container` | `String \| HTMLElement` | `null` | Container to place widget into. If `null`, floats fixed on screen. |
| `position` | `String` | `'top-right'` | Floating position when `container` is omitted (`'top-right'` or `'bottom-right'`). |
| `backgroundColor` | `String` | `null` | Custom background color (hex, rgb, transparent) for light mode. Auto-adjusts text contrast. |
| `darkBackgroundColor` | `String` | `null` | Custom background color (hex, rgb) applied when dark mode (`.dark`) is active. |
| `autoLoad` | `Boolean` | `true` | Automatically loads Google Fonts stylesheet for Noto Sans Newa when selected. |
| `storageKey` | `String` | `'font-switcher-selection'` | localStorage key for persisting user preference across pages. |

---

## 🎨 Supported Fonts

1. **Devanagari** — Standard Devanagari script (default browser font).
2. **Ranjana** — Authentic **Nithya Ranjana** decorative lipi webfont.
3. **Nepal Lipi "Aakha"** — Classic **Nepal Aakha** font (Devanagari-mapped).
4. **Nepal Lipi (Noto Sans)** — **Noto Sans Newa** Unicode 9.0 standard script (automatically converts Devanagari text to Newa Unicode block characters).

---

## 🎯 Example Integrations

### Floating Widget (Fixed Top-Right)
```html
<script>
  FontSwitcher.init({
    targetClasses: ['newa-content']
  });
</script>
```

### Navigation Bar Inline Placement
```html
<nav id="main-nav" style="background-color: #2c3e50;">
  <h2>Callijatra</h2>
  <!-- Widget will be appended here -->
</nav>

<script>
  FontSwitcher.init({
    container: '#main-nav',
    backgroundColor: '#2c3e50',
    targetClasses: ['newa-content']
  });
</script>
```

---

## 💻 Programmatic API

```javascript
// Switch font programmatically ('devanagari', 'ranjana', 'newa', or 'notoNewa')
FontSwitcher.switchFont('ranjana');

// Convert Devanagari text string directly to Newa Unicode
const newaText = FontSwitcher.toNewa("नमस्ते"); // Returns 𑐣𑐩𑐳𑑂𑐟𑐾

// Destroy widget and restore original text / styles
FontSwitcher.destroy();
```

---

## 🌐 Callijatra Foundation

This project is maintained by **Callijatra Foundation**, dedicated to preserving, promoting, and digitizing indigenous scripts and calligraphy of Nepal (such as Ranjana Lipi and Nepal Lipi) through open digital tools and fonts.

- **Website**: [callijatra.github.io](https://callijatra.github.io)
- **Instagram**: [@callijatra](https://www.instagram.com/callijatra)
- **Facebook**: [ranjana-script](https://www.facebook.com/ranjana-script)
- **YouTube**: [@callijatra](https://www.youtube.com/@callijatra)
- **GitHub**: [github.com/callijatra](https://github.com/callijatra)
- **Email**: [callijatrafoundation@gmail.com](mailto:callijatrafoundation@gmail.com)

---

## 📄 License

Open source release under the Callijatra Foundation project guidelines. Same license as the Nithya Ranjana font project.
