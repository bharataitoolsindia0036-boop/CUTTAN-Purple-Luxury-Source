const CACHE_NAME = "cuttan-v7";
const BASE = "/CUTTAN-Purple-Luxury-Source";
const APP_SHELL = [
  `${BASE}/`,
  `${BASE}/?source=pwa`,
  `${BASE}/manifest.webmanifest`,
  `${BASE}/icons/cuttan-192.png`,
  `${BASE}/icons/cuttan-512.png`
];

// 1. INSTALL - Cache App Shell - Offline ku first step
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// 2. ACTIVATE - Clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k.startsWith("cuttan-") && k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// 3. FETCH - OFFLINE WORKING LOGIC - ITHU THAN KEY!
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Cache la iruntha return pannu - Offline work aagum
      if (cached) return cached;
      
      // Illa-na network fetch pannu
      return fetch(event.request)
        .then((response) => {
          // Success na cache la save pannu - Next time offline ku
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Network fail na - Offline fallback
          return caches.match(`${BASE}/`) || caches.match(`${BASE}/?source=pwa`);
        });
    })
  );
});

// 4. BACKGROUND SYNC - +6 ku
self.addEventListener("sync", (event) => {
  if (event.tag === "cuttan-sync") {
    event.waitUntil(Promise.resolve());
  }
});

// 5. PERIODIC SYNC - +6 ku
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "cuttan-periodic") {
    event.waitUntil(Promise.resolve());
  }
});

// 6. PUSH - +6 ku
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "CUTTAN", body: "New LUT available!" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: `${BASE}/icons/cuttan-192.png`,
      badge: `${BASE}/icons/cuttan-192.png`
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(`${BASE}/`));
});
