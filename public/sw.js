const CACHE_NAME='cuttan-v3';
const URLS=['/','/?source=pwa','/manifest.webmanifest','/icons/cuttan-192.png','/icons/cuttan-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.map(n=>{if(n!==CACHE_NAME)return caches.delete(n)}))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>caches.open(CACHE_NAME).then(cache=>{cache.put(e.request,res.clone());return res})).catch(()=>caches.match('/'))))});
self.addEventListener('sync',e=>{if(e.tag==='cuttan-sync')e.waitUntil(Promise.resolve())});
self.addEventListener('periodicsync',e=>{if(e.tag==='cuttan-periodic')e.waitUntil(Promise.resolve())});
self.addEventListener('push',e=>{const d=e.data?e.data.json():{title:'CUTTAN',body:'New LUT available!'};e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:'/icons/cuttan-192.png',badge:'/icons/cuttan-192.png'}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.openWindow('/'))});
