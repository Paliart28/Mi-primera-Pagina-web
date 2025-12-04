document.addEventListener("DOMContentLoaded", () => {

    // Coordenadas reales del accidente
    const accidente = [-33.5933, -70.6996];

    // Crear mapa
    const mapa = L.map("mapa-san-bernardo", {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView(accidente, 16);

    // Capa base estilo OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(mapa);

    // POLILÍNEA DEL TRAMO (estilo parecido al ejemplo)
    const tramo = [
        [-33.5850, -70.7050],
        [-33.5890, -70.7020],
        [-33.5933, -70.6996],
        [-33.5980, -70.6960],
        [-33.6020, -70.6930]
    ];

    L.polyline(tramo, {
        color: "#1E3A68",    // azul acero (tu paleta)
        weight: 6,           // línea gruesa (igual al ejemplo)
        opacity: 0.85
    }).addTo(mapa);

    // MARCADOR circular tipo METRO SANTIAGO
    const marcador = L.circleMarker(accidente, {
        radius: 12,
        fillColor: "#D90429",   // rojo alerta como el ejemplo
        color: "#ffffff",
        weight: 3,
        fillOpacity: 1
    }).addTo(mapa);

    // POPUP profesional
    marcador.bindPopup(`
        <div style="max-width:230px">
            <h4 style="margin:0 0 6px; font-family:'Poppins'; font-size:16px;">Accidente San Bernardo (2023)</h4>
            <p style="font-size:13px; margin:0;">
                Colisión entre convoy de pasajeros y de carga.
                <br><br><strong>Click de nuevo para cerrar.</strong>
            </p>
        </div>
    `);

    // efecto de apertura/cierre igual al de ejemplo
    marcador.on("click", () => {
        if (mapa.hasLayer(marcador)) {
            marcador.openPopup();
        }
    });
});
