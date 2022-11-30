export interface IConfig {
  baseApi: string;
  tileUrlTemplate: string;
}

function getStringOrThrow(name: string, value: string | undefined): string {
  if (value === null || typeof value === 'undefined') {
    throw new Error(`Env value ${name} is not defined`);
  }
  return value;
}

function getConfig(): IConfig {
  return {
    baseApi: getStringOrThrow('BASE_API', process.env.BASE_API),
    tileUrlTemplate: getStringOrThrow('TILE_URL_TEMPLATE', process.env.TILE_URL_TEMPLATE),
  };
}

export default getConfig;
