// CUTTAN v9 - Offline.html integrated - Offline Support 100%
const CACHE_NAME = "cuttan-v9-offline-page";
const BASE = "/CUTTAN-Purple-Luxury-Source";
const APP_SHELL = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/offline.html`,
  `${BASE}/?source=pwa`,
  `${BASE}/manifest.webmanifest`,
  `${BASE}/icons/cuttan-192.png`,
  `${BASE}/icons/cuttan-512.png`
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k.startsWith("cuttan-") && k !== CACHE_NAME).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// OFFLINE WORKING WITH OFFLINE.HTML FALLBACK
self.addEventListener("fetch", (event) => {
  // Only handle GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Navigation request (page load) -> show offline.html
          if (event.request.mode === 'navigate' || event.request.destination === 'document') {
            return caches.match(`${BASE}/offline.html`) || caches.match(`${BASE}/`) || caches.match(`${BASE}/index.html`);
          }
          // Other requests -> fallback to cached shell
          return caches.match(`${BASE}/`) || caches.match(`${BASE}/offline.html`);
        });
    })
  );
});

// PWABuilder +6 features
self.addEventListener("sync", (event) => {
  if (event.tag === "cuttan-sync") event.waitUntil(Promise.resolve());
});
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "cuttan-periodic") event.waitUntil(Promise.resolve());
});
self.addEventListener("push", (event) => {
  const d = event.data ? event.data.json() : { title: "CUTTAN Purple Luxury", body: "New LUT pack!" };
  event.waitUntil(
    self.registration.showNotification(d.title, {
      body: d.body,
      icon: `${BASE}/icons/cuttan-192.png`,
      badge: `${BASE}/icons/cuttan-192.png`
    })
  );
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(`${BASE}/`));
});
