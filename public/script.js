document.addEventListener('DOMContentLoaded', function () {
    function notifyUser(title, body) {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, {
              body: body,
              icon: 'path/to/icon.png' // Optional: Icon for the notification
            });
      
            // Send SMS at the same time the notification is shown
            sendSMS(body);
          });
        } else {
            // Fallback to regular notifications if Push API is not supported
            if (Notification.permission === "granted") {
                var notification = new Notification(title, { body: body });
        
                // Send SMS at the same time the notification is shown
                sendSMS(body);
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        var notification = new Notification(title, { body: body });
        
                        // Send SMS at the same time the notification is shown
                        sendSMS(body);
                    }
                });
            }
        }
      }
      
      function turnOnLEDLight() {
        notifyUser("LED Light", "It's time to turn on the LED light!");
        setTimeout(turnOffLEDLight, 1 * 60 * 1000); // 1 minute
      }
      
      function turnOffLEDLight() {
        notifyUser("LED Light", "It's time to turn off the LED light!");
        setTimeout(turnOnLEDLight, 1 * 60 * 1000); // 1 minute
      }
      
      function sendSMS(notificationMessage) {
        // Replace the recipient phone number with the actual number
        const recipientPhoneNumber = '+251973073279';
      
        // Make an AJAX request to the backend to send SMS
        fetch('/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: recipientPhoneNumber,
            body: `Alert: ${notificationMessage}`
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('SMS sent successfully:', data.message);
          } else {
            console.error('Error sending SMS:', data.message);
          }
        })
        .catch(error => console.error('Error sending SMS:', error));
      }
      
      
    

    // Register the service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(function (registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(function (error) {
                console.error('Service Worker registration failed:', error);
            });
    }
    setTimeout(turnOnLEDLight, 0);
});
