
const CACHE_NAME = "cuttan-v8";
const BASE = "/CUTTAN-Purple-Luxury-Source/";
const APP_URL = `${BASE}index.html`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Cache the main HTML. If this fails, installation
      // should fail instead of pretending offline is ready.
      const response = await fetch(APP_URL, {
        cache: "reload"
      });

      if (!response.ok) {
        throw new Error(
          `App shell failed: ${response.status} ${APP_URL}`
        );
      }

      await cache.put(APP_URL, response);
      await cache.put(BASE, response.clone());

      // Optional assets: do not fail installation if an
      // icon or manifest is missing.
      const optionalAssets = [
        `${BASE}manifest.webmanifest`,
        `${BASE}icons/cuttan-192.png`,
        `${BASE}icons/cuttan-512.png`
      ];

      await Promise.all(
        optionalAssets.map(async (url) => {
          try {
            const result = await fetch(url, {
              cache: "reload"
            });

            if (result.ok) {
              await cache.put(url, result);
            }
          } catch {
            // Optional resource unavailable.
          }
        })
      );

      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter(
            (key) =>
              key.startsWith("cuttan-") &&
              key !== CACHE_NAME
          )
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Never intercept writes, cross-origin requests,
  // or unsupported request types.
  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== self.location.origin
  ) {
    return;
  }

  const url = new URL(request.url);

  // Handle only requests belonging to this GitHub Pages app.
  if (!url.pathname.startsWith(BASE)) {
    return;
  }

  // Never put large user media into the runtime cache.
  if (
    request.destination === "video" ||
    request.destination === "audio"
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Navigation: use network first so updated HTML
      // can load; fall back to the cached app shell offline.
      if (request.mode === "navigate") {
        try {
          const response = await fetch(request);

          if (response.ok) {
            await cache.put(request, response.clone());
          }

          return response;
        } catch {
          return (
            (await cache.match(request)) ||
            (await cache.match(BASE)) ||
            (await cache.match(APP_URL)) ||
            new Response(
              "CUTTAN is offline. Open it online once to prepare offline files.",
              {
                status: 503,
                headers: {
                  "Content-Type": "text/plain; charset=utf-8"
                }
              }
            )
          );
        }
      }

      // Cache-first for static application resources.
      const cached = await cache.match(request);

      if (cached) {
        return cached;
      }

      try {
        const response = await fetch(request);

        const cacheable =
          response.ok &&
          response.type === "basic" &&
          ["script", "style", "worker", "font", "image"]
            .includes(request.destination);

        if (cacheable) {
          await cache.put(request, response.clone());
        }

        return response;
      } catch {
        return new Response("Resource unavailable offline", {
          status: 503,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        });
      }
    })()
  );
});
