const CACHE_NAME="cuttan-v6";
const APP_SHELL=["/","/?source=pwa","/manifest.webmanifest","/icons/cuttan-192.png","/icons/cuttan-512.png"];
self.addEventListener("install",(e)=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)));self.skipWaiting();});
self.addEventListener("activate",(e)=>{e.waitUntil(Promise.all([caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("cuttan-")&&x!==CACHE_NAME).map(x=>caches.delete(x)))),self.clients.claim()]));});
self.addEventListener("fetch",(e)=>{const r=e.request;const u=new URL(r.url);if(r.method!=="GET"||u.origin!==self.location.origin)return;if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE_NAME).then(ca=>ca.put("/",cp));}return res;}).catch(async()=> (await caches.match(r))||(await caches.match("/"))||Response.error()));return;}e.respondWith(caches.match(r).then(async(cached)=>{if(cached)return cached;try{const res=await fetch(r);if(res.ok&&res.type==="basic"){const cp=res.clone();caches.open(CACHE_NAME).then(ca=>ca.put(r,cp));}return res;}catch{return Response.error();}}));});
self.addEventListener("sync",(e)=>{if(e.tag==="cuttan-sync")e.waitUntil(Promise.resolve());});
self.addEventListener("periodicsync",(e)=>{if(e.tag==="cuttan-periodic")e.waitUntil(Promise.resolve());});
self.addEventListener("push",(e)=>{const d=e.data?e.data.json():{title:"CUTTAN",body:"New LUT!"};e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:"/icons/cuttan-192.png",badge:"/icons/cuttan-192.png"}));});
self.addEventListener("notificationclick",(e)=>{e.notification.close();e.waitUntil(clients.openWindow("/"));});
