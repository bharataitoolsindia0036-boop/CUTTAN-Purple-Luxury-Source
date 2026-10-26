/* CUTTAN shell-only service worker. User media and exported blobs are never cached. */
const CACHE_NAME = 'cuttan-shell-v1';
const SHELL = ['/', '/index.html', '/offline.html', '/manifest.webmanifest', '/icons/cuttan-192.png', '/icons/cuttan-512.png', '/icons/cuttan.svg'];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const url = new URL(request.url);
  // Do not cache user-selected files, blobs, exports, or dynamic API responses.
  if (url.pathname.startsWith('/ffmpeg/') || url.pathname.includes('/api/')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(async () => (await caches.match(request)) || (await caches.match('/offline.html'))));
    return;
  }
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)); }
      return response;
    })));
  }
});
