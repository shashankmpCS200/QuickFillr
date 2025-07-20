# 🔧 Personal Autofill Chrome Extension

A lightweight Chrome extension built with Manifest V3 that helps you autofill forms on any webpage using personal information stored locally in your browser.

## ✨ Features

- **🔒 Privacy-First**: All data stays in your browser using `chrome.storage.local` - no servers involved
- **🎯 Smart Detection**: Automatically detects name, email, and phone input fields
- **💨 Quick Fill**: Shows dropdown suggestions when you focus on compatible fields
- **🎨 Clean UI**: Modern, responsive popup interface for managing your information
- **🌐 Universal**: Works on all websites (`<all_urls>` permission)
- **⚡ Fast**: No frameworks - pure HTML, CSS, and JavaScript

## 📁 File Structure

```
chrome-extension/
├── manifest.json      # Manifest V3 configuration
├── popup.html         # Extension popup interface
├── popup.js          # Popup logic and storage handling
├── content.js        # Content script for autofill functionality
├── style.css         # Popup styling
├── test.html         # Sample page for testing
└── README.md         # This file
```

## 🚀 Installation

### Method 1: Load Unpacked (Developer Mode)

1. **Download/Clone** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in the top-right corner)
4. **Click "Load unpacked"** and select the extension folder
5. **Pin the extension** to your toolbar for easy access

### Method 2: Manual Installation

1. Download all files to a folder named `personal-autofill-extension`
2. Follow the same steps as Method 1

> **Note**: You'll need an `icon.png` file (16x16, 48x48, or 128x128 pixels) or remove the icon references from `manifest.json`

## 📖 Usage

### Setting Up Your Information

1. **Click the extension icon** in your Chrome toolbar
2. **Fill in your personal information**:
   - Name (full name)
   - Email address
   - Phone number
3. **Click "Save Information"**
4. The popup will close automatically after saving

### Using Autofill

1. **Navigate to any website** with forms
2. **Click on input fields** that match:
   - Name fields (id/name/placeholder containing "name")
   - Email fields (type="email" or containing "email")
   - Phone fields (type="tel" or containing "phone"/"tel")
3. **See the dropdown** appear below the field with your saved information
4. **Click the dropdown suggestion** to fill the field instantly

### Field Detection

The extension intelligently detects field types based on:

- **Input type** (`email`, `tel`, `text`)
- **ID attributes** (`id="email"`, `id="phone"`, `id="name"`)
- **Name attributes** (`name="email"`, `name="phone"`, `name="fullname"`)
- **Placeholder text** (`placeholder="Enter your email"`)

## 🧪 Testing

Open the included `test.html` file in Chrome to test the extension with various form types:

```bash
# Open the test file
open test.html
# or
google-chrome test.html
```

The test page includes multiple forms with different field naming conventions to ensure compatibility.

## 🛠️ Technical Details

### Manifest V3 Features

- **Content Scripts**: Runs on all pages to detect and handle form fields
- **Storage API**: Uses `chrome.storage.local` for persistent data storage
- **Action API**: Modern popup interface replacement for browser action

### Browser Compatibility

- **Chrome**: ✅ Full support (Manifest V3)
- **Edge**: ✅ Full support (Chromium-based)
- **Firefox**: ❌ Requires Manifest V2 adaptation
- **Safari**: ❌ Requires Safari Web Extension adaptation

### Security Features

- **No external connections**: All data processing happens locally
- **Content Security Policy**: Strict CSP prevents XSS attacks
- **Minimal permissions**: Only requires `storage` and `activeTab`

## 🔧 Customization

### Adding New Field Types

Edit `content.js` in the `detectInputType()` function:

```javascript
// Add detection for custom field types
if (id.includes('address') || name.includes('address')) {
    return 'address';
}
```

### Styling the Dropdown

Modify the inline styles in `content.js` within the `showAutofillDropdown()` function:

```javascript
dropdown.style.cssText = `
    /* Your custom styles here */
    background: #f0f0f0;
    border: 2px solid #333;
`;
```

### Popup Appearance

Edit `style.css` to customize the popup interface colors, fonts, and layout.

## 🐛 Troubleshooting

### Extension Not Working

1. **Check permissions**: Ensure the extension has access to the current site
2. **Reload the extension**: Go to `chrome://extensions/` and click the reload button
3. **Check console**: Open Developer Tools and look for error messages
4. **Verify installation**: Make sure all files are in the correct locations

### Dropdown Not Appearing

1. **Save information first**: The dropdown only appears if you have saved data
2. **Check field detection**: Use the test page to verify field detection works
3. **Try different fields**: Test with various input types (text, email, tel)

### Data Not Saving

1. **Check storage permissions**: Ensure the extension has storage permission
2. **Clear extension data**: Reset by removing and reinstalling the extension
3. **Check for errors**: Look in the console for storage-related errors

## 🤝 Contributing

Feel free to:

- **Report bugs** via issues
- **Suggest features** for improvement
- **Submit pull requests** with enhancements
- **Share feedback** on usability

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔮 Future Enhancements

- [ ] Address autofill support
- [ ] Multiple profile management
- [ ] Import/export functionality
- [ ] Custom field mapping
- [ ] Keyboard shortcuts
- [ ] Form detection improvements
- [ ] Accessibility enhancements

---

**Happy Autofilling!** 🚀