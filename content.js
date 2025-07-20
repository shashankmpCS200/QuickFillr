// Global variables
let currentDropdown = null;
let personalInfo = {};

// Load personal information when script starts
loadPersonalInfo();

/**
 * Load personal information from chrome storage
 */
function loadPersonalInfo() {
    chrome.storage.local.get(['personalInfo'], function(result) {
        if (result.personalInfo) {
            personalInfo = result.personalInfo;
        }
    });
}

/**
 * Listen for storage changes to update personalInfo in real-time
 */
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'local' && changes.personalInfo) {
        personalInfo = changes.personalInfo.newValue || {};
    }
});

/**
 * Detect input field type based on various attributes
 * @param {HTMLElement} input - The input element to analyze
 * @returns {string|null} - The field type ('name', 'email', 'phone') or null
 */
function detectInputType(input) {
    const id = input.id.toLowerCase();
    const name = input.name.toLowerCase();
    const placeholder = input.placeholder.toLowerCase();
    const type = input.type.toLowerCase();
    
    // Check for email patterns
    if (type === 'email' || 
        id.includes('email') || 
        name.includes('email') || 
        placeholder.includes('email')) {
        return 'email';
    }
    
    // Check for phone patterns
    if (type === 'tel' || 
        id.includes('phone') || id.includes('tel') || 
        name.includes('phone') || name.includes('tel') ||
        placeholder.includes('phone') || placeholder.includes('tel')) {
        return 'phone';
    }
    
    // Check for name patterns
    if (id.includes('name') || id.includes('fullname') || 
        name.includes('name') || name.includes('fullname') ||
        placeholder.includes('name') || placeholder.includes('full name')) {
        return 'name';
    }
    
    return null;
}

/**
 * Create and show autofill dropdown
 * @param {HTMLElement} input - The input element to attach dropdown to
 * @param {string} fieldType - The type of field ('name', 'email', 'phone')
 */
function showAutofillDropdown(input, fieldType) {
    // Remove any existing dropdown first
    removeDropdown();
    
    // Check if we have data for this field type
    if (!personalInfo[fieldType] || personalInfo[fieldType].trim() === '') {
        return;
    }
    
    // Create dropdown element
    const dropdown = document.createElement('div');
    dropdown.className = 'autofill-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index: 10000;
        min-width: 200px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
    `;
    
    // Create dropdown item
    const item = document.createElement('div');
    item.className = 'autofill-item';
    item.textContent = `Fill: ${personalInfo[fieldType]}`;
    item.style.cssText = `
        padding: 10px 12px;
        cursor: pointer;
        border-bottom: none;
        color: #333;
        background: white;
        transition: background-color 0.2s;
    `;
    
    // Add hover effect
    item.addEventListener('mouseenter', function() {
        item.style.backgroundColor = '#f5f5f5';
    });
    
    item.addEventListener('mouseleave', function() {
        item.style.backgroundColor = 'white';
    });
    
    // Handle clicking on dropdown item (use mousedown to prevent input blur)
    item.addEventListener('mousedown', function(e) {
        e.preventDefault(); // Prevent input from losing focus
        input.value = personalInfo[fieldType];
        
        // Trigger input events to ensure compatibility with frameworks
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        
        removeDropdown();
    });
    
    dropdown.appendChild(item);
    
    // Position dropdown below the input
    const rect = input.getBoundingClientRect();
    dropdown.style.top = (rect.bottom + window.scrollY) + 'px';
    dropdown.style.left = (rect.left + window.scrollX) + 'px';
    dropdown.style.width = Math.max(rect.width, 200) + 'px';
    
    // Add to page
    document.body.appendChild(dropdown);
    currentDropdown = dropdown;
}

/**
 * Remove the current dropdown if it exists
 */
function removeDropdown() {
    if (currentDropdown) {
        currentDropdown.remove();
        currentDropdown = null;
    }
}

/**
 * Handle input focus events
 */
document.addEventListener('focusin', function(e) {
    const input = e.target;
    
    // Only handle input elements (text, email, tel)
    if (input.tagName === 'INPUT' && 
        ['text', 'email', 'tel'].includes(input.type)) {
        
        const fieldType = detectInputType(input);
        if (fieldType) {
            // Small delay to ensure input is properly focused
            setTimeout(() => {
                showAutofillDropdown(input, fieldType);
            }, 100);
        }
    }
});

/**
 * Handle input blur events
 */
document.addEventListener('focusout', function(e) {
    // Small delay to allow for dropdown clicks
    setTimeout(() => {
        removeDropdown();
    }, 200);
});

/**
 * Handle clicks outside dropdown
 */
document.addEventListener('click', function(e) {
    if (currentDropdown && !currentDropdown.contains(e.target)) {
        removeDropdown();
    }
});

/**
 * Handle page navigation/unload
 */
window.addEventListener('beforeunload', function() {
    removeDropdown();
});

// Remove dropdown when pressing escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        removeDropdown();
    }
});