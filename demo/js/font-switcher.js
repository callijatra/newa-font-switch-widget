/**
 * Font Switcher Widget
 * A standalone widget for switching between Original, Ranjana, Nepal Lipi Aakha, and Noto Sans Newa fonts
 */

(function(window) {
  'use strict';

  /**
   * Devanagari to Newa Unicode Converter
   * Matches NepalLipiConverter.kt / ne_to_new_converter.py exactly.
   * Handles 3-char Devanagari clusters (ङ्ह, ञ्ह, र्ह) correctly.
   */
  const DevanagariToNewa = (function() {
    var fp = String.fromCodePoint;

    // Multi-char Devanagari → single Newa char (checked first)
    var multiCharMap = {};
    multiCharMap["\u0919\u094D\u0939"] = fp(0x11413); // ङ्ह → 𑐓
    multiCharMap["\u091E\u094D\u0939"] = fp(0x11419); // ञ्ह → 𑐙
    multiCharMap["\u0930\u094D\u0939"] = fp(0x1142D); // र्ह → 𑐭

    // Single Devanagari char → Newa char
    var m = {};
    // Vowels
    m["\u0905"] = fp(0x11400); // अ → 𑐀
    m["\u0906"] = fp(0x11401); // आ → 𑐁
    m["\u0907"] = fp(0x11402); // इ → 𑐂
    m["\u0908"] = fp(0x11403); // ई → 𑐃
    m["\u0909"] = fp(0x11404); // उ → 𑐄
    m["\u090A"] = fp(0x11405); // ऊ → 𑐅
    m["\u090B"] = fp(0x11406); // ऋ → 𑐆
    m["\u090C"] = fp(0x11408); // ऌ → 𑐈
    m["\u090F"] = fp(0x1140A); // ए → 𑐊
    m["\u0910"] = fp(0x1140B); // ऐ → 𑐋
    m["\u0913"] = fp(0x1140C); // ओ → 𑐌
    m["\u0914"] = fp(0x1140D); // औ → 𑐍
    // Consonants — velar
    m["\u0915"] = fp(0x1140E); // क → 𑐎
    m["\u0916"] = fp(0x1140F); // ख → 𑐏
    m["\u0917"] = fp(0x11410); // ग → 𑐐
    m["\u0918"] = fp(0x11411); // घ → 𑐑
    m["\u0919"] = fp(0x11412); // ङ → 𑐒
    // Consonants — palatal
    m["\u091A"] = fp(0x11414); // च → 𑐔
    m["\u091B"] = fp(0x11415); // छ → 𑐕
    m["\u091C"] = fp(0x11416); // ज → 𑐖
    m["\u091D"] = fp(0x11417); // झ → 𑐗
    m["\u091E"] = fp(0x11418); // ञ → 𑐘
    // Consonants — retroflex
    m["\u091F"] = fp(0x1141A); // ट → 𑐚
    m["\u0920"] = fp(0x1141B); // ठ → 𑐛
    m["\u0921"] = fp(0x1141C); // ड → 𑐜
    m["\u0922"] = fp(0x1141D); // ढ → 𑐝
    m["\u0923"] = fp(0x1141E); // ण → 𑐞
    // Consonants — dental
    m["\u0924"] = fp(0x1141F); // त → 𑐟
    m["\u0925"] = fp(0x11420); // थ → 𑐠
    m["\u0926"] = fp(0x11421); // द → 𑐡
    m["\u0927"] = fp(0x11422); // ध → 𑐢
    m["\u0928"] = fp(0x11423); // न → 𑐣
    // Consonants — labial
    m["\u092A"] = fp(0x11425); // प → 𑐥
    m["\u092B"] = fp(0x11426); // फ → 𑐦
    m["\u092C"] = fp(0x11427); // ब → 𑐧
    m["\u092D"] = fp(0x11428); // भ → 𑐨
    m["\u092E"] = fp(0x11429); // म → 𑐩
    // Consonants — other
    m["\u092F"] = fp(0x1142B); // य → 𑐫
    m["\u0930"] = fp(0x1142C); // र → 𑐬
    m["\u0932"] = fp(0x1142E); // ल → 𑐮
    m["\u0935"] = fp(0x11430); // व → 𑐰
    m["\u0936"] = fp(0x11431); // श → 𑐱
    m["\u0937"] = fp(0x11432); // ष → 𑐲
    m["\u0938"] = fp(0x11433); // स → 𑐳
    m["\u0939"] = fp(0x11434); // ह → 𑐴
    // Matras (vowel signs)
    m["\u093E"] = fp(0x11435); // ा → 𑐵
    m["\u093F"] = fp(0x11436); // ि → 𑐶
    m["\u0940"] = fp(0x11437); // ी → 𑐷
    m["\u0941"] = fp(0x11438); // ु → 𑐸
    m["\u0942"] = fp(0x11439); // ू → 𑐹
    m["\u0943"] = fp(0x1143A); // ृ → 𑐺
    m["\u0947"] = fp(0x1143E); // े → 𑐾
    m["\u0948"] = fp(0x1143F); // ै → 𑐿
    m["\u094B"] = fp(0x11440); // ो → 𑑀
    m["\u094C"] = fp(0x11441); // ौ → 𑑁
    // Special signs
    m["\u094D"] = fp(0x11442); // ् virama → 𑑂
    m["\u0901"] = fp(0x11443); // ँ chandrabindu → 𑑃
    m["\u0902"] = fp(0x11444); // ं anusvara → 𑑄
    m["\u0903"] = fp(0x11445); // ः visarga → 𑑅
    m["\u093C"] = fp(0x11446); // ़ nukta → 𑑆
    m["\u0950"] = fp(0x11449); // ॐ Om → 𑑉
    // Punctuation
    m["\u0964"] = fp(0x1144B); // । danda → 𑑋
    m["\u0965"] = fp(0x1144C); // ॥ double danda → 𑑌
    // Digits
    m["\u0966"] = fp(0x11450); // ० → 𑑐
    m["\u0967"] = fp(0x11451); // १ → 𑑑
    m["\u0968"] = fp(0x11452); // २ → 𑑒
    m["\u0969"] = fp(0x11453); // ३ → 𑑓
    m["\u096A"] = fp(0x11454); // ४ → 𑑔
    m["\u096B"] = fp(0x11455); // ५ → 𑑕
    m["\u096C"] = fp(0x11456); // ६ → 𑑖
    m["\u096D"] = fp(0x11457); // ७ → 𑑗
    m["\u096E"] = fp(0x11458); // ८ → 𑑘
    m["\u096F"] = fp(0x11459); // ९ → 𑑙

    return {
      convert: function(text) {
        var result = [];
        var i = 0;
        var n = text.length;
        while (i < n) {
          // Try 3-char cluster match first
          if (i + 2 < n) {
            var tri = text.substring(i, i + 3);
            if (multiCharMap.hasOwnProperty(tri)) {
              result.push(multiCharMap[tri]);
              i += 3;
              continue;
            }
          }
          // Single char lookup
          var ch = text.charAt(i);
          result.push(m.hasOwnProperty(ch) ? m[ch] : ch);
          i += 1;
        }
        return result.join('');
      }
    };
  })();

  const FontSwitcher = {
    config: {
      targetSelector: 'body',
      targetClasses: null,
      container: null,
      backgroundColor: null,
      position: 'fixed',
      autoLoad: true,
      storageKey: 'font-switcher-selection'
    },

    fonts: {
      devanagari: {
        name: 'Devanagari',
        family: null,
        preview: '\u0928\u092E\u0938\u094D\u0924\u0947' // नमस्ते
      },
      ranjana: {
        name: 'Ranjana',
        family: 'NithyaRanjana, sans-serif',
        preview: '\u0928\u092E\u0938\u094D\u0924\u0947' // नमस्ते
      },
      newa: {
        name: 'Nepal Lipi "Aakha"',
        family: '"NewaAakha", sans-serif',
        preview: '\u0928\u092E\u0938\u094D\u0924\u0947' // नमस्ते
      },
      notoNewa: {
        name: 'Nepal Lipi (Noto Sans)',
        family: '"Noto Sans Newa", sans-serif',
        preview: null // set dynamically with converted Newa text
      }
    },

    currentFont: 'devanagari',
    widgetElement: null,
    googleFontsLoaded: false,
    originalTextMap: new Map(), // stores original text for restoration

    /**
     * Initialize the font switcher widget
     * @param {Object} options - Configuration options
     */
    init: function(options) {
      // Merge user options with defaults
      if (options) {
        Object.assign(this.config, options);
      }

      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    },

    /**
     * Setup the widget
     */
    setup: function() {
      // Load saved preference from localStorage
      const savedFont = this.getSavedFont();
      if (savedFont && this.fonts[savedFont]) {
        this.currentFont = savedFont;
      }

      // Preload Google Fonts for dropdown preview
      if (this.config.autoLoad) {
        this.loadGoogleFonts();
      }

      // Create and inject widget UI
      this.createWidget();

      // Apply initial font
      this.applyFont(this.currentFont);
    },

    /**
     * Check if a color is dark (for automatic text color adjustment)
     * @param {string} color - Color value (hex, rgb, rgba, etc.)
     * @returns {boolean} True if color is dark
     */
    isDarkColor: function(color) {
      if (!color) return false;
      
      // Remove whitespace and convert to lowercase
      color = color.trim().toLowerCase();
      
      // Handle transparent
      if (color === 'transparent') return false;
      
      // Handle hex colors
      if (color.startsWith('#')) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
      }
      
      // Handle rgb/rgba
      const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
      }
      
      // Handle named colors (common dark colors)
      const darkColors = ['black', 'navy', 'darkblue', 'mediumblue', 'blue', 'darkgreen', 'green', 'teal', 'darkcyan', 'deepskyblue', 'darkred', 'red', 'darkmagenta', 'magenta', 'maroon', 'purple', 'indigo', 'darkslategray', 'darkslategrey', 'darkgray', 'darkgrey', 'gray', 'grey'];
      if (darkColors.includes(color)) {
        return true;
      }
      
      // Default to light if we can't determine
      return false;
    },

    /**
     * Get the container element where widget should be inserted
     * @returns {HTMLElement|null} Container element or null for default positioning
     */
    getContainerElement: function() {
      if (!this.config.container) {
        return null; // Use default fixed positioning
      }

      // If it's already a DOM element, return it
      if (this.config.container instanceof HTMLElement) {
        return this.config.container;
      }

      // If it's a string, treat it as a CSS selector
      if (typeof this.config.container === 'string') {
        const element = document.querySelector(this.config.container);
        if (!element) {
          console.warn('Font Switcher: Container element not found:', this.config.container);
          return null;
        }
        return element;
      }

      return null;
    },

    /**
     * Create the widget UI element
     */
    createWidget: function() {
      // Create container
      const container = document.createElement('div');
      container.id = 'font-switcher-widget';
      container.className = 'font-switcher-container';

      // Check if we should use a custom container or default positioning
      const targetContainer = this.getContainerElement();
      if (targetContainer) {
        // Insert into custom container - remove fixed positioning styles
        container.classList.add('font-switcher-inline');
      } else {
        // Use default fixed positioning
        container.classList.add('font-switcher-fixed');
      }

      // Create label
      const label = document.createElement('label');
      label.htmlFor = 'font-switcher-select';
      label.className = 'font-switcher-label';
      label.textContent = 'Font:';
      label.setAttribute('aria-label', 'Select font');

      // Set notoNewa preview using converted Newa text
      if (!this.fonts.notoNewa.preview) {
        this.fonts.notoNewa.preview = DevanagariToNewa.convert('\u0928\u092E\u0938\u094D\u0924\u0947');
      }

      // Build custom dropdown for proper font preview rendering
      const dropdown = document.createElement('div');
      dropdown.className = 'font-switcher-dropdown';
      dropdown.id = 'font-switcher-select';
      dropdown.setAttribute('role', 'listbox');
      dropdown.setAttribute('aria-label', 'Font selection');
      dropdown.tabIndex = 0;

      const selected = document.createElement('div');
      selected.className = 'font-switcher-selected';

      const optionsList = document.createElement('div');
      optionsList.className = 'font-switcher-options';

      const self = this;
      const fontKeys = Object.keys(this.fonts);

      function updateSelectedDisplay(key) {
        const fontDef = self.fonts[key];
        var previewText = fontDef.preview ? ' - ' + fontDef.preview : '';
        selected.textContent = fontDef.name + previewText;
        if (fontDef.family) {
          selected.style.fontFamily = fontDef.family;
        } else {
          selected.style.fontFamily = '';
        }
      }

      fontKeys.forEach(key => {
        const fontDef = this.fonts[key];
        const item = document.createElement('div');
        item.className = 'font-switcher-option';
        item.setAttribute('role', 'option');
        item.setAttribute('data-value', key);

        // Font name
        const nameSpan = document.createElement('span');
        nameSpan.className = 'font-switcher-option-name';
        nameSpan.textContent = fontDef.name;

        // Preview in actual font
        const previewSpan = document.createElement('span');
        previewSpan.className = 'font-switcher-option-preview';
        if (fontDef.preview) {
          previewSpan.textContent = fontDef.preview;
        }
        if (fontDef.family) {
          previewSpan.style.fontFamily = fontDef.family;
        }

        item.appendChild(nameSpan);
        item.appendChild(previewSpan);

        if (key === this.currentFont) {
          item.classList.add('font-switcher-option-active');
        }

        item.addEventListener('click', (e) => {
          e.stopPropagation();
          // Update active state
          optionsList.querySelectorAll('.font-switcher-option').forEach(el => {
            el.classList.remove('font-switcher-option-active');
          });
          item.classList.add('font-switcher-option-active');
          updateSelectedDisplay(key);
          dropdown.classList.remove('font-switcher-open');
          this.switchFont(key);
        });

        optionsList.appendChild(item);
      });

      updateSelectedDisplay(this.currentFont);

      // Toggle dropdown open/close
      selected.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('font-switcher-open');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        dropdown.classList.remove('font-switcher-open');
      });

      dropdown.appendChild(selected);
      dropdown.appendChild(optionsList);

      // Assemble widget
      container.appendChild(label);
      container.appendChild(dropdown);

      // Apply custom background color if specified (after elements are created)
      if (this.config.backgroundColor) {
        container.style.backgroundColor = this.config.backgroundColor;
        
        // Auto-adjust text color for better contrast on dark backgrounds
        const isDark = this.isDarkColor(this.config.backgroundColor);
        if (isDark) {
          container.style.color = '#ffffff';
          label.style.color = '#ffffff';
          selected.style.backgroundColor = this.config.backgroundColor;
          selected.style.color = '#ffffff';
          selected.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
      }

      // Insert into target container or body (for fixed positioning)
      if (targetContainer) {
        targetContainer.appendChild(container);
      } else {
        document.body.appendChild(container);
      }

      this.widgetElement = container;
    },

    /**
     * Switch to a different font
     * @param {string} fontKey - Font key ('devanagari', 'ranjana', 'newa', or 'notoNewa')
     */
    switchFont: function(fontKey) {
      if (!this.fonts[fontKey]) {
        console.warn('Invalid font key:', fontKey);
        return;
      }

      this.currentFont = fontKey;
      this.applyFont(fontKey);
      this.saveFont(fontKey);

      // Load Google Fonts if switching to Noto Sans Newa
      if (fontKey === 'notoNewa' && !this.googleFontsLoaded && this.config.autoLoad) {
        this.loadGoogleFonts();
      }
    },

    /**
     * Get all target elements based on configuration
     * @returns {NodeList} List of target elements
     */
    getTargetElements: function() {
      let elements = [];
      
      // If targetClasses is specified, use it
      if (this.config.targetClasses && Array.isArray(this.config.targetClasses) && this.config.targetClasses.length > 0) {
        // Build selector from class names
        const classSelector = this.config.targetClasses
          .map(className => className.trim().replace(/^\./, '')) // Remove leading dot if present
          .map(className => `.${className}`)
          .join(', ');
        elements = document.querySelectorAll(classSelector);
      } else if (this.config.targetSelector) {
        // Use targetSelector if targetClasses is not specified
        elements = document.querySelectorAll(this.config.targetSelector);
      }
      
      return elements;
    },

    /**
     * Recursively walk text nodes within an element
     * @param {Node} node - DOM node to walk
     * @param {Function} callback - Called with each text node
     */
    walkTextNodes: function(node, callback) {
      if (node.nodeType === Node.TEXT_NODE) {
        callback(node);
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          this.walkTextNodes(node.childNodes[i], callback);
        }
      }
    },

    /**
     * Store original text content of target elements
     * @param {NodeList} elements - Target elements
     */
    storeOriginalText: function(elements) {
      elements.forEach(el => {
        if (this.originalTextMap.has(el)) return;
        const textData = [];
        this.walkTextNodes(el, function(textNode) {
          textData.push({ node: textNode, text: textNode.textContent });
        });
        this.originalTextMap.set(el, textData);
      });
    },

    /**
     * Restore original text content of target elements
     * @param {NodeList} elements - Target elements
     */
    restoreOriginalText: function(elements) {
      elements.forEach(el => {
        const textData = this.originalTextMap.get(el);
        if (textData) {
          textData.forEach(function(entry) {
            if (entry.node.parentNode) {
              entry.node.textContent = entry.text;
            }
          });
        }
      });
    },

    /**
     * Convert text content of elements from Devanagari to Newa Unicode
     * @param {NodeList} elements - Target elements
     */
    convertTextToNewa: function(elements) {
      this.storeOriginalText(elements);
      elements.forEach(el => {
        this.walkTextNodes(el, function(textNode) {
          textNode.textContent = DevanagariToNewa.convert(textNode.textContent);
        });
      });
    },

    /**
     * Apply font to target elements
     * @param {string} fontKey - Font key
     */
    applyFont: function(fontKey) {
      const font = this.fonts[fontKey];
      const targetElements = this.getTargetElements();
      const dataAttribute = 'data-font-switcher-original-size';

      // First, restore original text if switching away from notoNewa
      if (fontKey !== 'notoNewa') {
        this.restoreOriginalText(targetElements);
      }

      targetElements.forEach(el => {
        // Handle font size for Ranjana
        if (fontKey === 'ranjana') {
          if (!el.hasAttribute(dataAttribute)) {
            const computedStyle = window.getComputedStyle(el);
            const originalSize = computedStyle.fontSize;
            el.setAttribute(dataAttribute, originalSize);
          }
          const originalSize = el.getAttribute(dataAttribute);
          const originalSizeValue = parseFloat(originalSize);
          const increasedSize = originalSizeValue * 1.50;
          el.style.fontSize = increasedSize + 'px';
        } else {
          if (el.hasAttribute(dataAttribute)) {
            const originalSize = el.getAttribute(dataAttribute);
            el.style.fontSize = originalSize;
          } else {
            el.style.fontSize = '';
          }
        }

        // Handle font family
        if (fontKey === 'devanagari') {
          el.style.fontFamily = '';
          el.classList.remove('font-switcher-ranjana', 'font-switcher-newa', 'font-switcher-notoNewa');
        } else {
          el.style.fontFamily = font.family;
          el.classList.remove('font-switcher-ranjana', 'font-switcher-newa', 'font-switcher-notoNewa');
          el.classList.add(`font-switcher-${fontKey}`);
        }
      });

      // Convert text to Newa Unicode when notoNewa is selected
      if (fontKey === 'notoNewa') {
        this.convertTextToNewa(targetElements);
      }

      // Update custom dropdown display
      const dropdown = document.getElementById('font-switcher-select');
      if (dropdown) {
        const selectedEl = dropdown.querySelector('.font-switcher-selected');
        const font = this.fonts[fontKey];
        if (selectedEl && font) {
          var previewText = font.preview ? ' - ' + font.preview : '';
          selectedEl.textContent = font.name + previewText;
          selectedEl.style.fontFamily = font.family || '';
        }
        dropdown.querySelectorAll('.font-switcher-option').forEach(el => {
          el.classList.toggle('font-switcher-option-active', el.getAttribute('data-value') === fontKey);
        });
      }
    },

    /**
     * Load Google Fonts for Noto Sans Newa
     */
    loadGoogleFonts: function() {
      if (this.googleFontsLoaded) {
        return;
      }

      // Check if Google Fonts API is already loaded
      const existingLink = document.querySelector('link[href*="fonts.googleapis.com"]');
      if (existingLink) {
        this.googleFontsLoaded = true;
        return;
      }

      // Create link element for Google Fonts
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Newa&display=swap';
      link.onload = () => {
        this.googleFontsLoaded = true;
      };
      document.head.appendChild(link);
    },

    /**
     * Save font selection to localStorage
     * @param {string} fontKey - Font key to save
     */
    saveFont: function(fontKey) {
      try {
        localStorage.setItem(this.config.storageKey, fontKey);
      } catch (e) {
        // localStorage not available, silently fail
        console.warn('localStorage not available:', e);
      }
    },

    /**
     * Get saved font from localStorage
     * @returns {string|null} Saved font key or null
     */
    getSavedFont: function() {
      try {
        return localStorage.getItem(this.config.storageKey);
      } catch (e) {
        // localStorage not available, silently fail
        return null;
      }
    },

    /**
     * Destroy the widget and remove it from DOM
     */
    destroy: function() {
      if (this.widgetElement && this.widgetElement.parentNode) {
        this.widgetElement.parentNode.removeChild(this.widgetElement);
        this.widgetElement = null;
      }

      // Remove font classes and styles, restore font sizes and text
      const targetElements = this.getTargetElements();
      const dataAttribute = 'data-font-switcher-original-size';
      this.restoreOriginalText(targetElements);
      this.originalTextMap.clear();
      targetElements.forEach(el => {
        el.style.fontFamily = '';
        el.classList.remove('font-switcher-ranjana', 'font-switcher-newa', 'font-switcher-notoNewa');

        if (el.hasAttribute(dataAttribute)) {
          const originalSize = el.getAttribute(dataAttribute);
          el.style.fontSize = originalSize;
          el.removeAttribute(dataAttribute);
        } else {
          el.style.fontSize = '';
        }
      });
    }
  };

  // Expose to global scope
  window.FontSwitcher = FontSwitcher;

})(window);

