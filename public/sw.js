// public/sw.js

// Install event: Skip waiting so it becomes active immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event: Take control of uncontrolled clients
self.addEventListener('activate', (event) => {
  self.clients.claim();
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  const data = event.data;

  if (data?.type === 'SHOW_NOTIFICATION') {
    const { title, body } = data;

    self.registration.showNotification(title || 'Notification', {
      body: body || '',
      icon: '/icons/icon-192.png', // optional icon
      badge: '/icons/icon-192.png', // optional badge
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

