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
let demoMode = false;

// Demo mode variables
let demoCanvas;
let demoCtx;
let heatCanvas;
let heatCtx;
let currentLocation = { lat: 51.5074, lng: -0.1278, name: 'London' }; // Default London
let zoom = 13;
let panOffset = { x: 0, y: 0 };

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

// ========================================
// DEMO MODE FUNCTIONS
// ========================================

// Predefined demo locations
const demoLocations = {
    'london': { lat: 51.5074, lng: -0.1278, name: 'London' },
    'manchester': { lat: 53.4808, lng: -2.2426, name: 'Manchester' },
    'birmingham': { lat: 52.4862, lng: -1.8904, name: 'Birmingham' },
    'new york': { lat: 40.7128, lng: -74.0060, name: 'New York' },
    'los angeles': { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
    'paris': { lat: 48.8566, lng: 2.3522, name: 'Paris' },
    'tokyo': { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
    'sydney': { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
};

// Initialize demo mode
function initDemoMode() {
    console.log('Running in DEMO MODE (Google Maps API not available)');
    demoMode = true;

    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = '';

    // Create canvas for map background
    demoCanvas = document.createElement('canvas');
    demoCanvas.style.position = 'absolute';
    demoCanvas.style.top = '0';
    demoCanvas.style.left = '0';
    demoCanvas.style.width = '100%';
    demoCanvas.style.height = '100%';
    mapContainer.appendChild(demoCanvas);

    // Create canvas for heatmap overlay
    heatCanvas = document.createElement('canvas');
    heatCanvas.style.position = 'absolute';
    heatCanvas.style.top = '0';
    heatCanvas.style.left = '0';
    heatCanvas.style.width = '100%';
    heatCanvas.style.height = '100%';
    heatCanvas.style.pointerEvents = 'none';
    mapContainer.appendChild(heatCanvas);

    demoCtx = demoCanvas.getContext('2d');
    heatCtx = heatCanvas.getContext('2d');

    // Add demo mode indicator
    const indicator = document.createElement('div');
    indicator.style.position = 'absolute';
    indicator.style.top = '10px';
    indicator.style.right = '10px';
    indicator.style.background = 'rgba(255, 107, 107, 0.9)';
    indicator.style.color = 'white';
    indicator.style.padding = '8px 15px';
    indicator.style.borderRadius = '5px';
    indicator.style.fontSize = '0.85rem';
    indicator.style.fontWeight = 'bold';
    indicator.style.zIndex = '1000';
    indicator.textContent = 'DEMO MODE';
    mapContainer.appendChild(indicator);

    // Resize canvases
    resizeDemoCanvas();
    window.addEventListener('resize', resizeDemoCanvas);

    // Set up event listeners
    setupDemoEventListeners();

    // Generate initial traffic data
    generateDemoTrafficData();

    // Draw initial map
    drawDemoMap();
    drawDemoHeatmap();

    // Update traffic periodically
    updateInterval = setInterval(() => {
        generateDemoTrafficData();
        drawDemoHeatmap();
    }, 5000);
}

// Resize demo canvases
function resizeDemoCanvas() {
    const mapContainer = document.getElementById('map');
    const width = mapContainer.offsetWidth;
    const height = mapContainer.offsetHeight;

    demoCanvas.width = width;
    demoCanvas.height = height;
    heatCanvas.width = width;
    heatCanvas.height = height;

    if (demoMode) {
        drawDemoMap();
        drawDemoHeatmap();
    }
}

// Draw demo map background
function drawDemoMap() {
    const width = demoCanvas.width;
    const height = demoCanvas.height;

    // Clear canvas
    demoCtx.fillStyle = '#1a1a1a';
    demoCtx.fillRect(0, 0, width, height);

    // Draw grid pattern (streets)
    const gridSize = 80 * (zoom / 13);
    demoCtx.strokeStyle = '#2a2a2a';
    demoCtx.lineWidth = 2;

    // Vertical lines
    for (let x = (panOffset.x % gridSize); x < width; x += gridSize) {
        demoCtx.beginPath();
        demoCtx.moveTo(x, 0);
        demoCtx.lineTo(x, height);
        demoCtx.stroke();
    }

    // Horizontal lines
    for (let y = (panOffset.y % gridSize); y < height; y += gridSize) {
        demoCtx.beginPath();
        demoCtx.moveTo(0, y);
        demoCtx.lineTo(width, y);
        demoCtx.stroke();
    }

    // Draw some "major roads" (thicker lines)
    demoCtx.strokeStyle = '#383838';
    demoCtx.lineWidth = 4;
    const majorGridSize = gridSize * 3;

    for (let x = (panOffset.x % majorGridSize); x < width; x += majorGridSize) {
        demoCtx.beginPath();
        demoCtx.moveTo(x, 0);
        demoCtx.lineTo(x, height);
        demoCtx.stroke();
    }

    for (let y = (panOffset.y % majorGridSize); y < height; y += majorGridSize) {
        demoCtx.beginPath();
        demoCtx.moveTo(0, y);
        demoCtx.lineTo(width, y);
        demoCtx.stroke();
    }

    // Draw location name
    demoCtx.fillStyle = '#666';
    demoCtx.font = 'bold 16px sans-serif';
    demoCtx.textAlign = 'left';
    demoCtx.fillText(currentLocation.name, 20, 30);
}

// Generate demo traffic data
function generateDemoTrafficData() {
    const width = heatCanvas.width;
    const height = heatCanvas.height;
    const numPoints = 20;

    trafficData = [];

    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const severity = Math.floor(Math.random() * 5);

        trafficData.push({
            x: x,
            y: y,
            severity: severity,
            speed: 60 - (severity * 12)
        });
    }
}

// Draw demo heatmap
function drawDemoHeatmap() {
    if (!heatCtx || trafficData.length === 0) return;

    const width = heatCanvas.width;
    const height = heatCanvas.height;

    // Clear canvas
    heatCtx.clearRect(0, 0, width, height);

    const intensitySlider = document.getElementById('intensitySlider');
    const intensity = parseFloat(intensitySlider.value);
    const toggleTraffic = document.getElementById('toggleTraffic');

    if (!toggleTraffic.checked) return;

    // Color gradient: green -> yellow -> orange -> red
    const colors = [
        'rgba(76, 209, 55, ALPHA)',    // Green (light traffic)
        'rgba(255, 235, 59, ALPHA)',   // Yellow
        'rgba(255, 159, 67, ALPHA)',   // Orange
        'rgba(238, 90, 36, ALPHA)',    // Red-orange
        'rgba(255, 71, 87, ALPHA)'     // Red (severe traffic)
    ];

    trafficData.forEach(point => {
        const baseSize = 30;
        const size = baseSize + (point.severity * 20);
        const color = colors[point.severity];

        // Draw multiple concentric circles for glow effect
        const layers = 3;
        for (let i = layers; i > 0; i--) {
            const layerSize = size * (i / layers);
            const layerAlpha = intensity * (0.3 / i);

            const gradient = heatCtx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, layerSize
            );

            gradient.addColorStop(0, color.replace('ALPHA', layerAlpha * 0.8));
            gradient.addColorStop(0.5, color.replace('ALPHA', layerAlpha * 0.4));
            gradient.addColorStop(1, color.replace('ALPHA', '0'));

            heatCtx.fillStyle = gradient;
            heatCtx.beginPath();
            heatCtx.arc(point.x, point.y, layerSize, 0, Math.PI * 2);
            heatCtx.fill();
        }

        // Draw center dot
        heatCtx.fillStyle = color.replace('ALPHA', intensity);
        heatCtx.beginPath();
        heatCtx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        heatCtx.fill();
    });
}

// Setup demo event listeners
function setupDemoEventListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const toggleTraffic = document.getElementById('toggleTraffic');
    const intensitySlider = document.getElementById('intensitySlider');

    // Search functionality
    searchBtn.addEventListener('click', () => performDemoSearch(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performDemoSearch(searchInput.value);
    });

    // Toggle traffic
    toggleTraffic.addEventListener('change', () => drawDemoHeatmap());

    // Intensity slider
    intensitySlider.addEventListener('input', () => drawDemoHeatmap());

    // Add autocomplete suggestions for demo
    const suggestions = Object.keys(demoLocations);
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        // Simple autocomplete could be added here
    });
}

// Perform demo search
function performDemoSearch(query) {
    if (!query.trim()) return;

    const queryLower = query.toLowerCase();
    let found = false;

    // Check predefined locations
    for (const [key, location] of Object.entries(demoLocations)) {
        if (key.includes(queryLower) || queryLower.includes(key)) {
            currentLocation = location;
            found = true;
            break;
        }
    }

    if (found) {
        // Animate zoom (simple version)
        zoom = 14;
        generateDemoTrafficData();
        drawDemoMap();
        drawDemoHeatmap();
    } else {
        // Show available locations
        const available = Object.values(demoLocations).map(l => l.name).join(', ');
        alert(`Demo locations available: ${available}\n\nTry searching for any of these cities!`);
    }
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize when DOM is ready
function initialize() {
    // Wait a bit for Google Maps to load
    setTimeout(() => {
        if (typeof google === 'undefined' || window.googleMapsError) {
            // Google Maps not available, use demo mode
            initDemoMode();
        } else {
            // Google Maps available, use full version
            initMap();
        }
    }, 1000);
}

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
