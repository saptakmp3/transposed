var C="listen-v1",A=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(function(r){
    var net=fetch(e.request).then(function(res){if(res&&(res.ok||res.type==="opaque")){var cl=res.clone();caches.open(C).then(function(c){c.put(e.request,cl)})}return res}).catch(function(){return r||caches.match("./index.html")});
    return r||net;
  }));
});
