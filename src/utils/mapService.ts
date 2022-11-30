import leaflet, { GeoJSON } from 'leaflet';
import { Theme } from '@mui/material';

class MapService {
  private readonly map: leaflet.Map;

  private geoLayer: leaflet.GeoJSON | null = null;

  private internalTags = new Set(['type', 'id', 'lat', 'lon', 'timestamp', 'version', 'changeset', 'user', 'uid', 'nodes']);

  private tileUrlTemplate: string;

  constructor(tileUrlTemplate: string) {
    this.tileUrlTemplate = tileUrlTemplate;
    this.map = leaflet.map(
      'map',
      {
        keyboard: false,
        zoomControl: false,
        scrollWheelZoom: false,
        boxZoom: false,
        doubleClickZoom: false,
        dragging: false,
      },
    );

    leaflet.tileLayer(this.tileUrlTemplate, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  public setView(left: number, bottom: number, right: number, top: number): void {
    const corner1 = leaflet.latLng(top, left);
    const corner2 = leaflet.latLng(bottom, right);
    const bounds = leaflet.latLngBounds(corner1, corner2);

    this.map.fitBounds(bounds);
  }

  public setGeoJson(geoJson: GeoJSON.FeatureCollection, theme: Theme): void {
    if (this.geoLayer) {
      this.geoLayer.remove();
    }

    this.geoLayer = leaflet.geoJSON(geoJson, {
      style: { color: theme.palette.primary.main },
      onEachFeature: (feature, layer) => {
        const tags: Record<string, string> = feature.properties ?? {};
        const description = Object.entries(tags)
          .filter((e) => !this.internalTags.has(e[0]))
          .map((e) => `${e[0]}: ${e[1]}`).join('; ');
        layer.bindPopup(description);
      },
    });

    this.geoLayer.addTo(this.map);
  }
}

export default MapService;
