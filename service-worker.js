
const CACHE_NAME = "mis-tests-v2";

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
            .then(cache => cache.addAll(ARCHIVOS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(nombres =>
                Promise.all(
                    nombres
                        .filter(nombre =>
                            nombre.startsWith("mis-tests-") &&
                            nombre !== CACHE_NAME
                        )
                        .map(nombre => caches.delete(nombre))
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(respuesta => {
                if (respuesta.ok) {
                    const copia = respuesta.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, copia));
                }

                return respuesta;
            })
            .catch(() => caches.match(event.request))
    );
});
