// public/sw.js

// Install event: Activate the service worker immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event: Take control of all clients
self.addEventListener('activate', (event) => {
  self.clients.claim();
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  const data = event.data;

  if (data?.type === 'SHOW_NOTIFICATION') {
    const { title, body } = data;

    // ✅ First, ensure permission is granted
    self.registration.pushManager.getSubscription().then(() => {
      self.registration.showNotification(title || 'Notification', {
        body: body || '',
        icon: '/icons/icon-192.png', // Optional icon
        badge: '/icons/icon-192.png', // Optional badge
      });
    }).catch((err) => {
      console.error("🚫 Notification not shown - Permission not granted or subscription failed", err);
    });
  }
});

// Optional: Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('/');
    })
  );
});
