document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const statusText = document.getElementById('status');

  browser.runtime.sendMessage({action: "getState"}, function(response) {
    toggleSwitch.checked = response.blocking;
    updateStatus(response.blocking);
  });

  toggleSwitch.addEventListener('change', function() {
    const isBlocking = toggleSwitch.checked;
    browser.runtime.sendMessage({action: "setState", blocking: isBlocking});
    updateStatus(isBlocking);
  });

  function updateStatus(isBlocking) {
    statusText.textContent = isBlocking ? "Blocking: On" : "Blocking: Off";
  }
});
