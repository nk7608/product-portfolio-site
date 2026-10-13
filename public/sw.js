/* Cache only the self-contained fallback. Portfolio pages and PDFs stay network-first. */
const OFFLINE_CACHE = "nayana-offline-v1";
self.addEventListener("install", event => {
  event.waitUntil(caches.open(OFFLINE_CACHE).then(cache => cache.add("/offline.html")).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("nayana-offline-") && key !== OFFLINE_CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin || event.request.mode !== "navigate" || url.pathname.startsWith("/assets/")) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.status >= 500) return caches.match("/offline.html").then(cached => cached || response);
    return response;
  }).catch(() => caches.match("/offline.html").then(cached => cached || new Response("Unable to load the page. Please reconnect and retry.", {status:503,headers:{"Content-Type":"text/plain"}}))));
});
