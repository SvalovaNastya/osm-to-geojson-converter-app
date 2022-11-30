import MapService from './mapService';
import { IConfig } from '../config';
import OsmClient from '../clients/osmClient';
import HttpClient from '../clients/httpClient';

class AppContainer {
  private map: MapService | null = null;

  private osm: OsmClient | null = null;

  private readonly config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }

  public get osmClient(): OsmClient {
    if (!this.osm) {
      const httpApi = new HttpClient(this.config.baseApi);
      this.osm = new OsmClient(httpApi);
    }

    return this.osm;
  }

  public get mapService(): MapService {
    if (!this.map) {
      this.map = new MapService(this.config.tileUrlTemplate);
    }

    return this.map;
  }
}

export default AppContainer;
