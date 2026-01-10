# Heat - Traffic Heatmap Visualization

A web application that visualizes traffic congestion using circular heatmaps overlaid on a grayscale Google Maps interface.

## Features

- 🔍 **Location Search** - Search by location, postcode, or road name
- 🗺️ **Grayscale Map** - Filtered Google Maps view for better heatmap visibility
- 🔥 **Traffic Heatmap** - Circular heat indicators showing traffic severity
- 🎨 **Dynamic Visualization** - Size and color adjust based on traffic intensity
- ⚡ **Real-time Updates** - Traffic data updates automatically

## Setup

### Prerequisites

- Google Maps API key with the following APIs enabled:
  - Maps JavaScript API
  - Places API
  - Geocoding API

### Installation

1. Clone or download this repository

2. Get a Google Maps API key:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Maps JavaScript API, Places API, and Geocoding API
   - Create credentials (API key)

3. Update `index.html`:
   - Replace `YOUR_API_KEY` with your actual Google Maps API key
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places,visualization"></script>
   ```

4. Open `index.html` in a web browser

## Usage

1. **Search for a Location**
   - Enter a location, postcode, or road name in the search bar
   - Press Enter or click the Search button
   - The map will center on your searched location

2. **View Traffic Heatmap**
   - Circular heat indicators show traffic congestion
   - Green = Light traffic
   - Yellow = Moderate traffic
   - Orange = Heavy traffic
   - Red = Severe congestion

3. **Controls**
   - Toggle traffic heatmap visibility
   - Adjust heatmap intensity using the slider

## How It Works

1. **Map Rendering** - Google Maps is rendered with a grayscale filter
2. **Traffic Data** - Currently uses simulated traffic data (can be replaced with real Google Traffic API)
3. **Heatmap Overlay** - Custom canvas overlay draws circular heatmaps
4. **Dynamic Sizing** - Circle size and color intensity scale with traffic severity

## Customization

### Using Real Traffic Data

To use real Google Maps traffic data, you'll need to:

1. Enable the Traffic Layer API in your Google Cloud project
2. Modify `generateTrafficData()` to fetch actual traffic information
3. Parse the traffic data to extract congestion points and severity

### Adjusting Heatmap Appearance

In `app.js`, you can customize:
- `baseSize` - Base circle size
- `colors` array - Traffic severity color gradient
- `numPoints` - Number of traffic hotspots displayed
- `layers` - Number of concentric circles for glow effect

## File Structure

```
HeatMap/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── app.js          # JavaScript logic and map integration
└── README.md       # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- The current implementation uses **simulated traffic data**
- For production use, integrate with real traffic APIs
- Consider rate limits and costs for Google Maps API usage
- API key should be restricted in production for security

## Future Enhancements

- [ ] Real-time traffic data integration
- [ ] Historical traffic analysis
- [ ] Traffic prediction
- [ ] Route planning with traffic avoidance
- [ ] Mobile responsive improvements
- [ ] Traffic incident markers
- [ ] Custom location bookmarks

## License

MIT License - feel free to use and modify as needed.
