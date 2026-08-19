// Service worker mínimo — necesario para que el navegador permita "Instalar app".
const CACHE = 'ctc-gps-v1';
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ self.clients.claim(); });
self.addEventListener('fetch', function(e){
  // network-first: siempre intenta traer la versión más nueva; si no hay internet, usa la última guardada.
  e.respondWith(
    fetch(e.request).then(function(res){
      var resClone = res.clone();
      caches.open(CACHE).then(function(cache){ cache.put(e.request, resClone); });
      return res;
    }).catch(function(){
      return caches.match(e.request);
    })
  );
});
