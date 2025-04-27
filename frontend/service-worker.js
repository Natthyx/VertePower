self.addEventListener('notificationclick', function (event) {
    // Handle notification click event
    event.notification.close();
    console.log('Notification clicked');
    // You can add additional logic here, e.g., open a specific page
});
