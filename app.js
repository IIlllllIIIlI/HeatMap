// Heat - Traffic Heatmap Visualization
// Main application logic

let map;
let trafficLayer;
let heatmapLayer;
let canvas;
let ctx;
let searchBox;
let geocoder;
let trafficData = [];
let updateInterval;

// Initialize the map
function initMap() {
    const defaultLocation = { lat: 51.5074, lng: -0.1278 }; // London

    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 13,
        styles: [
            {
                stylers: [
                    { saturation: -100 },
                    { lightness: -20 }
                ]
            }
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
    });

    // Initialize geocoder
    geocoder = new google.maps.Geocoder();

    // Initialize search box with autocomplete
    const input = document.getElementById('searchInput');
    searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport
    map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
    });

    // Listen for place selection
    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        map.setCenter(place.geometry.location);
        map.setZoom(14);

        // Update traffic visualization
        updateTrafficVisualization();
    });

    // Create traffic layer (native Google Maps traffic)
    trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // Create canvas overlay for custom heatmap
    createHeatmapOverlay();

    // Set up event listeners
    setupEventListeners();

    // Start updating traffic visualization
    updateTrafficVisualization();
    updateInterval = setInterval(updateTrafficVisualization, 60000); // Update every minute
}

// Create canvas overlay for heatmap circles
function createHeatmapOverlay() {
    const overlay = new google.maps.OverlayView();

    overlay.onAdd = function() {
        canvas = document.createElement('canvas');
        canvas.className = 'heat-overlay';
        canvas.style.position = 'absolute';
        canvas.style.pointerEvents = 'none';

        const panes = this.getPanes();
        panes.overlayLayer.appendChild(canvas);
    };

    overlay.draw = function() {
        const projection = this.getProjection();
        const bounds = map.getBounds();

        if (!projection || !bounds) return;

        // Resize canvas to map size
        const mapDiv = map.getDiv();
        canvas.width = mapDiv.offsetWidth;
        canvas.height = mapDiv.offsetHeight;

        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw heatmap circles
        drawTrafficHeatmap(projection);
    };

    overlay.setMap(map);

    // Redraw on map events
    map.addListener('zoom_changed', () => overlay.draw());
    map.addListener('center_changed', () => overlay.draw());
    map.addListener('bounds_changed', () => overlay.draw());
}

// Generate simulated traffic data points
function generateTrafficData() {
    const bounds = map.getBounds();
    if (!bounds) return [];

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const data = [];
    const numPoints = 20; // Number of traffic hotspots

    for (let i = 0; i < numPoints; i++) {
        const lat = sw.lat() + Math.random() * (ne.lat() - sw.lat());
        const lng = sw.lng() + Math.random() * (ne.lng() - sw.lng());

        // Random traffic severity (0-4: light to severe)
        const severity = Math.floor(Math.random() * 5);

        data.push({
            location: new google.maps.LatLng(lat, lng),
            severity: severity,
            speed: 60 - (severity * 12) // Speed decreases with severity
        });
    }

    return data;
}

// Draw traffic heatmap with circles
function drawTrafficHeatmap(projection) {
    if (!ctx || trafficData.length === 0) return;

    const intensitySlider = document.getElementById('intensitySlider');
    const intensity = parseFloat(intensitySlider.value);

    trafficData.forEach(point => {
        const pixel = projection.fromLatLngToDivPixel(point.location);
        if (!pixel) return;

        // Calculate size and color based on severity
        const baseSize = 30;
        const size = baseSize + (point.severity * 20);

        // Color gradient: green -> yellow -> orange -> red
        const colors = [
            'rgba(76, 209, 55, ALPHA)',    // Green (light traffic)
            'rgba(255, 235, 59, ALPHA)',   // Yellow
            'rgba(255, 159, 67, ALPHA)',   // Orange
            'rgba(238, 90, 36, ALPHA)',    // Red-orange
            'rgba(255, 71, 87, ALPHA)'     // Red (severe traffic)
        ];

        const color = colors[point.severity];

        // Draw multiple concentric circles for glow effect
        const layers = 3;
        for (let i = layers; i > 0; i--) {
            const layerSize = size * (i / layers);
            const layerAlpha = intensity * (0.3 / i);

            const gradient = ctx.createRadialGradient(
                pixel.x, pixel.y, 0,
                pixel.x, pixel.y, layerSize
            );

            gradient.addColorStop(0, color.replace('ALPHA', layerAlpha * 0.8));
            gradient.addColorStop(0.5, color.replace('ALPHA', layerAlpha * 0.4));
            gradient.addColorStop(1, color.replace('ALPHA', '0'));

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(pixel.x, pixel.y, layerSize, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw center dot
        ctx.fillStyle = color.replace('ALPHA', intensity);
        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Update traffic visualization
function updateTrafficVisualization() {
    trafficData = generateTrafficData();

    // Trigger overlay redraw
    if (map) {
        google.maps.event.trigger(map, 'resize');
    }
}

// Set up event listeners
function setupEventListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const toggleTraffic = document.getElementById('toggleTraffic');
    const intensitySlider = document.getElementById('intensitySlider');

    // Search button click
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    // Enter key in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    // Toggle traffic layer
    toggleTraffic.addEventListener('change', (e) => {
        if (e.target.checked) {
            updateTrafficVisualization();
            if (canvas) canvas.style.display = 'block';
        } else {
            if (canvas) canvas.style.display = 'none';
        }
    });

    // Intensity slider
    intensitySlider.addEventListener('input', () => {
        google.maps.event.trigger(map, 'bounds_changed');
    });
}

// Perform search
function performSearch(query) {
    if (!query.trim()) return;

    geocoder.geocode({ address: query }, (results, status) => {
        if (status === 'OK' && results[0]) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(14);
            updateTrafficVisualization();
        } else {
            alert('Location not found. Please try a different search term.');
        }
    });
}

// Initialize when DOM is ready
if (typeof google !== 'undefined') {
    google.maps.event.addDomListener(window, 'load', initMap);
} else {
    window.initMap = initMap;
}
