const CACHE_NAME = "mis-tests-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./preguntas.json",
    "./preguntas_especifico.json",
    "./manifest.json"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(ARCHIVOS);
            })
    );

});

self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request)
            .then(respuesta => {
                return respuesta || fetch(event.request);
            })
    );

});