/** Register the app-shell service worker only in production builds. */
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;
  try {
    await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL });
  } catch (error) {
    // PWA installation is optional; the app remains usable if registration fails.
    console.warn('CUTTAN service worker registration failed:', error);
  }
}
