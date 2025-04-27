const moistureSpan = document.getElementById('moisture');
const pumpOnButton = document.getElementById('pumpOn');
const pumpOffButton = document.getElementById('pumpOff');

// Function to fetch moisture level
function fetchMoisture() {
  fetch('http://localhost:3000/soil-moisture')
    .then(response => response.json())
    .then(data => {
      moistureSpan.textContent = data.moisture;
    })
    .catch(error => {
      console.error('Error fetching moisture:', error);
      moistureSpan.textContent = "Error";
    });
}

// Function to send pump command
function controlPump(action) {
  fetch('http://localhost:3000/pump', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action })
  })
  .then(response => {
    if (response.ok) {
      alert(`Pump ${action.toUpperCase()} command sent!`);
    } else {
      alert('Failed to send pump command.');
    }
  })
  .catch(error => console.error('Error sending pump command:', error));
}

// Event Listeners
pumpOnButton.addEventListener('click', () => controlPump('on'));
pumpOffButton.addEventListener('click', () => controlPump('off'));

// Update moisture every 5 seconds
setInterval(fetchMoisture, 5000);

// Initial load
fetchMoisture();
