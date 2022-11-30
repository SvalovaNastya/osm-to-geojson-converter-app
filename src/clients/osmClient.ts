import HttpClient, { HttpResponse } from './httpClient';

type OsmType = 'relation' | 'way' | 'node';

type OsmJson = {
  type: OsmType;
  id: number;
  lat: number;
  lon: number;
  timestamp?: string;
  version?: number;
  changeset?: number;
  user?:string
  uid?: number
  tags?: Record<string, string>;
  members?: { type: OsmType, ref: number, role: string }[];
  nodes?: number[]
};

class OsmClient {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getBoxJson(
    left: number,
    bottom: number,
    right: number,
    top: number,
  ): Promise<HttpResponse<OsmJson>> {
    return this.httpClient.get<OsmJson>(
      '/api/0.6/map.json',
      { bbox: [left, bottom, right, top] },
    );
  }
}

export default OsmClient;
