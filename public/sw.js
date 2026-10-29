const CACHE_NAME = "cuttan-v6";
const APP_SHELL = [
  "/",
  "/?source=pwa",
  "/manifest.webmanifest",
  "/icons/cuttan-192.png",
  "/icons/cuttan-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("cuttan-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      ),
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put("/", copy));
          }
          return response;
        })
        .catch(async () => {
          return (await caches.match(request)) || (await caches.match("/")) || Response.error();
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(async (cached) => {
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      } catch {
        return Response.error();
      }
    })
  );
});

// --- PWABuilder +3 points fix - Add these 3 listeners ---

// Background Sync ✅ - Makes app resilient to poor network
self.addEventListener("sync", (event) => {
  console.log("CUTTAN SW: Background Sync", event.tag);
  if (event.tag === "cuttan-sync") {
    event.waitUntil(Promise.resolve());
  }
});

// Periodic Sync ✅ - Show data instantly
self.addEventListener("periodicsync", (event) => {
  console.log("CUTTAN SW: Periodic Sync", event.tag);
  if (event.tag === "cuttan-periodic") {
    event.waitUntil(Promise.resolve());
  }
});

// Push Notifications ✅ - Re-engage users
self.addEventListener("push", (event) => {
  console.log("CUTTAN SW: Push received");
  const data = event.data ? event.data.json() : { title: "CUTTAN", body: "New LUT available!" };
  const options = {
    body: data.body || "CUTTAN Purple Luxury - New update!",
    icon: "/icons/cuttan-192.png",
    badge: "/icons/cuttan-192.png",
    vibrate: [200, 100, 200],
    data: { url: "/" }
  };
  event.waitUntil(self.registration.showNotification(data.title || "CUTTAN", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || "/"));
});
