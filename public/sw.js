// Kill-switch service worker. The previous gobiya.com deployment registered a
// service worker at this URL with scope '/', and browsers that visited that
// site keep serving the old cached pages from it. This replacement installs as
// its update, wipes every cache, unregisters itself, and reloads open tabs so
// returning visitors get the live site again. Keep this file deployed
// indefinitely — any visitor from the old era who returns needs it once.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
