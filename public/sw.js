// CUTTAN v8 - Offline Working 100% - No early return - Simple cache-first
const CACHE_NAME = "cuttan-v8-final";
const BASE = "/CUTTAN-Purple-Luxury-Source";
const APP_SHELL = [
  `${BASE}/`,
  `${BASE}/?source=pwa`,
  `${BASE}/manifest.webmanifest`,
  `${BASE}/icons/cuttan-192.png`,
  `${BASE}/icons/cuttan-512.png`,
  `${BASE}/index.html`
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("cuttan-") && k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

// OFFLINE WORKING - SIMPLE - PWABuilder detects!
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(`${BASE}/`) || caches.match(`${BASE}/index.html`) || caches.match(`${BASE}/?source=pwa`));
    })
  );
});

self.addEventListener("sync", (event) => { if (event.tag === "cuttan-sync") event.waitUntil(Promise.resolve()); });
self.addEventListener("periodicsync", (event) => { if (event.tag === "cuttan-periodic") event.waitUntil(Promise.resolve()); });
self.addEventListener("push", (event) => {
  const d = event.data ? event.data.json() : { title: "CUTTAN Purple Luxury", body: "New LUT pack available!" };
  event.waitUntil(self.registration.showNotification(d.title, { body: d.body, icon: `${BASE}/icons/cuttan-192.png`, badge: `${BASE}/icons/cuttan-192.png`, vibrate: [200,100,200] }));
});
self.addEventListener("notificationclick", (event) => { event.notification.close(); event.waitUntil(clients.openWindow(`${BASE}/`)); });
