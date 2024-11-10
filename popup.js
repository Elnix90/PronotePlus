document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const statusText = document.getElementById('status');
  
    // Charger l'état actuel
    browser.storage.sync.get('blocking', function(data) {
      toggleSwitch.checked = data.blocking !== undefined ? data.blocking : true;
      updateStatus(toggleSwitch.checked);
    });
  
    // Mettre à jour le statut lorsque l'interrupteur est activé/désactivé
    toggleSwitch.addEventListener('change', function() {
      const isBlocking = toggleSwitch.checked;
      browser.storage.sync.set({blocking: isBlocking}, function() {
        updateStatus(isBlocking);
        // Envoyer un message au content script
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
          browser.tabs.sendMessage(tabs[0].id, {action: "toggleBlocking", blocking: isBlocking});
        });
      });
    });
  
    function updateStatus(isBlocking) {
      statusText.textContent = isBlocking ? "Blocking: On" : "Blocking: Off";
    }
  });
  