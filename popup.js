// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('personalInfoForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const status = document.getElementById('status');
    
    // Load existing data when popup opens
    loadSavedData();
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        savePersonalInfo();
    });
    
    /**
     * Load saved personal information from chrome storage
     */
    function loadSavedData() {
        chrome.storage.local.get(['personalInfo'], function(result) {
            if (result.personalInfo) {
                const data = result.personalInfo;
                nameInput.value = data.name || '';
                emailInput.value = data.email || '';
                phoneInput.value = data.phone || '';
            }
        });
    }
    
    /**
     * Save personal information to chrome storage
     */
    function savePersonalInfo() {
        const personalInfo = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim()
        };
        
        // Save to chrome storage
        chrome.storage.local.set({ personalInfo: personalInfo }, function() {
            if (chrome.runtime.lastError) {
                showStatus('Error saving information!', 'error');
            } else {
                showStatus('Information saved successfully!', 'success');
                
                // Close popup after a short delay
                setTimeout(() => {
                    window.close();
                }, 1000);
            }
        });
    }
    
    /**
     * Show status message to user
     * @param {string} message - The message to display
     * @param {string} type - The type of message ('success' or 'error')
     */
    function showStatus(message, type) {
        status.textContent = message;
        status.className = `status ${type}`;
        status.classList.remove('hidden');
        
        // Hide status after 3 seconds
        setTimeout(() => {
            status.classList.add('hidden');
        }, 3000);
    }
});