# Changelog

All notable changes to the **Newa Font Switch Widget** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [1.3.0] - 2026-10-08

### Added
- **Comment Syntax Highlighting in Snippet Generator**: Styled HTML comment blocks (`<!-- ... -->`) in green (`#4ade80`) in the interactive snippet output for improved code readability.
- **Top-Right Copy Button**: Positioned the snippet copy button in the top-right corner of the code output box with hover feedback and temporary "Copied!" confirmation.

### Changed
- **Light Mode Dropdown Menu Harmonization**:
  - Replaced high-contrast pink (`#fbeae9`) active background and red text with clean, subtle `#f3f4f6` surface highlighting and `#111827` dark text.
  - Aligned preview text color with `#6b7280` secondary text and active font color to match the closed widget selection state.
  - Preserved the Callijatra brand accent indicator as a left border (`border-left: 3px solid #c0392b`).
- **Dark Mode Hover & Active State Refinement**:
  - Eliminated legacy reddish-brown hover backgrounds (`#3b1212`) in favor of clean semi-transparent surface tints (`rgba(255, 255, 255, 0.08)` hover and `rgba(255, 255, 255, 0.12)` active with `#ef4444` border).
- **Snippet Generator Rendering**:
  - Replaced fragile HTML regex highlighting with safe HTML-escaped preformatted text (`textContent`), preventing malformed tags from breaking the snippet display.

### Fixed
- **Stray Code Rendering Below Footer**:
  - Fixed an issue where an unescaped literal `</script>` tag inside a JavaScript code comment was prematurely closing the script block in the browser HTML parser.
- **Dark/Light Mode Media Query Leak**:
  - Resolved an issue where macOS system dark mode (`prefers-color-scheme: dark`) leaked dark text and brown hover colors into light mode by explicitly assigning `.light` and `.dark` classes to `<html>`.

---

## [1.2.0] - 2026-10-08

### Added
- **Callijatra Foundation Redesign**:
  - Redesigned landing page with Callijatra Foundation visual identity, sticky navbar, brand badge, and responsive desktop/mobile navigation.
  - Added theme toggle supporting persistent dark and light modes via `localStorage` and system preference detection.
- **Interactive Sandbox Multi-Script Matrix**:
  - Real-time comparison grid displaying editable sample text across Devanagari, Nithya Ranjana, Nepal Lipi "Aakha", and Noto Sans Newa simultaneously.
  - Live font badge indicators updating dynamically as fonts switch.
- **Interactive Code Snippet Generator**:
  - Configurator form allowing real-time customization of widget placement (`header`, `playground`, `fixed-top`, `fixed-bottom`, custom container selector).
  - Configurable label text and toggle option.
  - Outer container border and select field border toggles with independent light and dark border color pickers.
  - Background color pickers for light and dark modes with automated luminance contrast calculation.
  - Google Fonts auto-load toggle for Noto Sans Newa.
  - Real-time re-initialization of the live widget upon modifying configuration parameters.
- **Upward Dropdown Auto-Flipping**:
  - Added `dropDirection: 'auto' | 'up' | 'down'` option that automatically flips dropdown menus upward when placed near bottom screen edges.
- **Modernized Dropdown Chevron**:
  - Replaced CSS borders with SVG mask chevron arrow featuring smooth 180-degree rotation animation upon toggling.

---

## [1.1.0] - 2026-03-25

### Added
- **Transliteration Keyboard Tool (`demo/transliterate.html`)**:
  - Added an interactive web keyboard for transliterating Romanized English input to Devanagari and Nepal Lipi (Newa) script.
  - Integrated word suggestion dictionary for common Nepalbhasa terms.
- **Dropdown Script Previews**:
  - Enhanced custom dropdown menu items to show live script preview text ("नमस्ते" / "𑐣𑐩𑐳𑑂𑐟𑐾") alongside font names.
- **Devanagari to Newa Unicode Converter**:
  - Implemented standalone `DevanagariToNewa` converter handling complex conjunct clusters (ङ्ह, ञ्ह, र्ह), matras, virama, and numerals according to Nepal Lipi Unicode specifications.

---

## [1.0.0] - 2026-01-02

### Added
- **Multi-Font Support**:
  - Integrated **Nithya Ranjana** (`NithyaRanjana`) via CDN.
  - Bundled **Nepal Lipi "Aakha"** (`NewaAakha`) webfonts in WOFF2, WOFF, and OTF formats.
  - Added **Noto Sans Newa** Google Fonts integration.
- **Font Switcher Core Engine (`js/font-switcher.js`)**:
  - `FontSwitcher.init()` configuration API.
  - Automatic class and selector targeting (`targetClasses` and `targetSelector`).
  - Preference persistence across browser sessions using `localStorage`.
  - Programmatic API methods (`switchFont`, `toNewa`, `destroy`).

---

## [0.1.0] - 2025-12-21

### Added
- Initial proof-of-concept font switcher widget.
- Support for switching between Devanagari and Ranjana script.
- Basic demo page showing article text transformation.
