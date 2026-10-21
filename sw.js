var C="listen-v2",A=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var q=e.request;
  if(q.method!=="GET")return;
  if(q.mode==="navigate"){
    e.respondWith(fetch(q).then(function(res){var cl=res.clone();caches.open(C).then(function(c){c.put("./index.html",cl)});return res}).catch(function(){return caches.match("./index.html")}));
    return;
  }
  e.respondWith(caches.match(q).then(function(r){
    var net=fetch(q).then(function(res){if(res&&(res.ok||res.type==="opaque")){var cl=res.clone();caches.open(C).then(function(c){c.put(q,cl)})}return res}).catch(function(){return r});
    return r||net;
  }));
});
