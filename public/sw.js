/* Offline support. Pages stay network-first; when the network fails we serve, in order:
 * 1) the last copy of that page this browser saw, 2) /offline.html (a static summary with contact details).
 * The résumé and the offline game are cached so they work offline too. */
const CACHE = "nayana-offline-v2";
const PRECACHE = ["/offline.html", "/scope-runner.html", "/assets/nayana-kumari-ai-product-manager-resume.pdf"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("nayana-offline-") && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  // The résumé: network first, cached copy when offline.
  if (url.pathname === "/assets/nayana-kumari-ai-product-manager-resume.pdf") {
    event.respondWith(fetch(request).catch(() => caches.match(request).then(cached => cached || Response.error())));
    return;
  }
  if (request.mode !== "navigate" || url.pathname.startsWith("/assets/")) return;
  const fallback = () => caches.match(request).then(page => page || caches.match("/offline.html")).then(page => page || new Response("Unable to load the page. Please reconnect and retry.", { status: 503, headers: { "Content-Type": "text/plain" } }));
  event.respondWith(fetch(request).then(response => {
    if (response.status >= 500) return fallback().then(page => page || response);
    if (response.ok && response.type === "basic") { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => {}); }
    return response;
  }).catch(fallback));
});
