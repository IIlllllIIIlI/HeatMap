/**
 * HabitHero Service Worker
 * Handles offline caching and background sync
 */

const CACHE_NAME = 'habithero-v1';
const STATIC_ASSETS = [
    '/habitquest/',
    '/habitquest/index.html',
    '/habitquest/styles.css',
    '/habitquest/app.js',
    '/habitquest/manifest.json',
    'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch((err) => {
                console.error('[SW] Cache failed:', err);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached response if available
                if (cachedResponse) {
                    // Fetch and update cache in background
                    event.waitUntil(updateCache(event.request));
                    return cachedResponse;
                }

                // Not in cache, fetch from network
                return fetchAndCache(event.request);
            })
            .catch(() => {
                // Network failed and not in cache
                // Return offline fallback for HTML pages
                if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/habitquest/index.html');
                }
            })
    );
});

// Fetch and add to cache
async function fetchAndCache(request) {
    try {
        const response = await fetch(request);

        // Only cache successful responses
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }

        return response;
    } catch (error) {
        console.error('[SW] Fetch failed:', error);
        throw error;
    }
}

// Update cache in background
async function updateCache(request) {
    try {
        const response = await fetch(request);

        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response);
        }
    } catch (error) {
        // Network might be unavailable, that's okay
        console.log('[SW] Background update failed:', error);
    }
}

// Push notification event
self.addEventListener('push', (event) => {
    console.log('[SW] Push received:', event);

    const options = {
        body: event.data ? event.data.text() : 'Time to complete your habits!',
        icon: '/habitquest/assets/icon-192.png',
        badge: '/habitquest/assets/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            { action: 'open', title: 'Open HabitHero' },
            { action: 'dismiss', title: 'Dismiss' }
        ],
        tag: 'habithero-reminder',
        renotify: true
    };

    event.waitUntil(
        self.registration.showNotification('HabitHero', options)
    );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked:', event);

    event.notification.close();

    if (event.action === 'dismiss') return;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Focus existing window if open
                for (const client of clientList) {
                    if (client.url.includes('/habitquest/') && 'focus' in client) {
                        return client.focus();
                    }
                }

                // Open new window
                if (clients.openWindow) {
                    return clients.openWindow('/habitquest/');
                }
            })
    );
});

// Background sync event (for offline habit completions)
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync:', event.tag);

    if (event.tag === 'sync-habits') {
        event.waitUntil(syncHabits());
    }
});

// Sync habits when back online
async function syncHabits() {
    // In a real app, this would sync local changes to a server
    console.log('[SW] Syncing habits...');

    // Notify all clients that sync is complete
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
        client.postMessage({
            type: 'SYNC_COMPLETE',
            timestamp: Date.now()
        });
    });
}

// Message handling from main app
self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);

    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => cache.addAll(event.data.urls))
        );
    }
});

// Periodic background sync (for daily reminders)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'daily-reminder') {
        event.waitUntil(sendDailyReminder());
    }
});

async function sendDailyReminder() {
    const now = new Date();
    const hour = now.getHours();

    // Send reminder at 9 AM
    if (hour === 9) {
        await self.registration.showNotification('HabitHero', {
            body: "Good morning! Ready to conquer today's quests?",
            icon: '/habitquest/assets/icon-192.png',
            badge: '/habitquest/assets/badge-72.png',
            tag: 'daily-morning'
        });
    }

    // Send reminder at 8 PM if habits incomplete
    if (hour === 20) {
        await self.registration.showNotification('HabitHero', {
            body: "Don't forget to complete your daily quests!",
            icon: '/habitquest/assets/icon-192.png',
            badge: '/habitquest/assets/badge-72.png',
            tag: 'daily-evening'
        });
    }
}

console.log('[SW] Service worker loaded');
