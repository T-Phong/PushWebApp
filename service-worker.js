const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "/PushWebApp/",
    "/PushWebApp/index.html",
    "/PushWebApp/style.css",
    "/PushWebApp/script.js",
    "/PushWebApp/manifest.json",
    "/PushWebApp/icon.png"
];

// Cài đặt Service Worker & cache file
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Chặn request & lấy dữ liệu từ cache nếu có
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Xóa cache cũ khi cập nhật
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            );
        })
    );
});

self.addEventListener("push", function(event) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/icon.png",
        badge: "/icon.png",
        vibrate: [200, 100, 200],
        data: { url: data.url }
    });
});

self.addEventListener("notificationclick", function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
