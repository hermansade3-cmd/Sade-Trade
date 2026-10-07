/* R-Search pekee: haigusi cache wala service worker nyingine ya tovuti yako.
   Weka kwenye folda ile ile na R-Search-PC.html (ikiwezekana folda yake, mfano /r-search/). */
const C="rsearch-shell-v1",P="rsearch-shell-";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./"])).catch(()=>{}))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith(P)&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 const u=new URL(r.url);if(u.origin!==location.origin||!u.pathname.startsWith(new URL("./",location.href).pathname))return;
 e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})
  .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("./"):null)).then(m=>m||Response.error())))});
