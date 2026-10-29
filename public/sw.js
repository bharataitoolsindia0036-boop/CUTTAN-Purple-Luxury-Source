const CACHE_NAME = 'cuttan-v1';
const urlsToCache = ['/', '/?source=pwa', '/manifest.webmanifest', '/icons/cuttan-192.png', '/icons/cuttan-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); }))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => caches.open(CACHE_NAME).then(cache => { cache.put(e.request, res.clone()); return res; })).catch(() => caches.match('/'))));
});

self.addEventListener('sync', (e) => {
  if (e.tag === 'cuttan-sync') e.waitUntil(Promise.resolve());
});

self.addEventListener('periodicsync', (e) => {
  if (e.tag === 'cuttan-periodic') e.waitUntil(Promise.resolve());
});

self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : { title: 'CUTTAN', body: 'New LUT available!' };
  e.waitUntil(self.registration.showNotification(data.title, { body: data.body, icon: '/icons/cuttan-192.png', badge: '/icons/cuttan-192.png' }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
