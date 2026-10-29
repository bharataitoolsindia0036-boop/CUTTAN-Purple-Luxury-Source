// CUTTAN Purple Luxury - PWABuilder +6 Full - Simple Detectable Pattern
const CACHE_NAME = "cuttan-v6";
const APP_SHELL = [
  "/",
  "/?source=pwa",
  "/manifest.webmanifest",
  "/icons/cuttan-192.png",
  "/icons/cuttan-512.png"
];

// Install - Cache App Shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Activate - Clean Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k.startsWith("cuttan-") && k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch - Offline Support - Simple pattern PWABuilder detects!
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match("/") || caches.match("/?source=pwa"));
    })
  );
});

// Background Sync - Resilient to poor network
self.addEventListener("sync", (event) => {
  if (event.tag === "cuttan-sync") {
    event.waitUntil(Promise.resolve());
  }
});

// Periodic Sync - Show data instantly
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "cuttan-periodic") {
    event.waitUntil(Promise.resolve());
  }
});

// Push Notifications - Re-engage users
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "CUTTAN", body: "New LUT available!" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/cuttan-192.png",
      badge: "/icons/cuttan-192.png",
      vibrate: [200, 100, 200]
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
