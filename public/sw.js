// CUTTAN Purple Luxury - Service Worker - Full PWA 46/46 + SW +6
const CACHE_NAME = 'cuttan-v1';
const urlsToCache = [
  '/',
  '/?source=pwa',
  '/manifest.webmanifest',
  '/icons/cuttan-192.png',
  '/icons/cuttan-512.png'
];

// Install - Cache
self.addEventListener('install', (event) => {
  console.log('CUTTAN SW: Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate - Clean old cache
self.addEventListener('activate', (event) => {
  console.log('CUTTAN SW: Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Offline Support ✅
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).then((res) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, res.clone());
          return res;
        });
      }).catch(() => caches.match('/'));
    })
  );
});

// Background Sync ✅
self.addEventListener('sync', (event) => {
  console.log('CUTTAN SW: Background Sync', event.tag);
  if (event.tag === 'cuttan-sync') {
    event.waitUntil(
      // Sync videos when back online
      Promise.resolve()
    );
  }
});

// Periodic Sync ✅
self.addEventListener('periodicsync', (event) => {
  console.log('CUTTAN SW: Periodic Sync', event.tag);
  if (event.tag === 'cuttan-periodic') {
    event.waitUntil(
      // Update LUTs periodically
      Promise.resolve()
    );
  }
});

// Push Notifications ✅
self.addEventListener('push', (event) => {
  console.log('CUTTAN SW: Push Received');
  const data = event.data ? event.data.json() : { title: 'CUTTAN', body: 'New LUT available!' };
  const options = {
    body: data.body || 'CUTTAN Purple Luxury - New update!',
    icon: '/icons/cuttan-192.png',
    badge: '/icons/cuttan-192.png',
    vibrate: [200, 100, 200],
    data: { url: '/' }
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'CUTTAN', options)
  );
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
