const CACHE_NAME = "cuttan-v7-final-46-46";
const BASE = "/CUTTAN-Purple-Luxury-Source";
const APP_SHELL = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/?source=pwa`,
  `${BASE}/manifest.webmanifest`,
  `${BASE}/icons/cuttan-192.png`,
  `${BASE}/icons/cuttan-512.png`
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) =>
      c.addAll(APP_SHELL).catch(() => c.add(`${BASE}/`))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((k) =>
      Promise.all(
        k.filter((x) => x.startsWith("cuttan-") && x !== CACHE_NAME).map((x) => caches.delete(x))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((res) => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(`${BASE}/`) || caches.match(`${BASE}/index.html`));
    })
  );
});

self.addEventListener("sync", (e) => {
  if (e.tag === "cuttan-sync") e.waitUntil(Promise.resolve());
});
self.addEventListener("periodicsync", (e) => {
  if (e.tag === "cuttan-periodic") e.waitUntil(Promise.resolve());
});
self.addEventListener("push", (e) => {
  const d = e.data ? e.data.json() : { title: "CUTTAN", body: "New LUT!" };
  e.waitUntil(
    self.registration.showNotification(d.title, {
      body: d.body,
      icon: `${BASE}/icons/cuttan-192.png`
    })
  );
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow(`${BASE}/`));
});
