export type CoordinateDirection = 'latitude' | 'longitude';
export const coordinateRange: Record<CoordinateDirection, number[]> = {
  latitude: [-90.0, 90.0],
  longitude: [-180.0, 180.0],
};

export function isValid(value: number, direction: CoordinateDirection): boolean {
  const cornerValue = coordinateRange[direction];

  return value <= cornerValue[1] && value >= cornerValue[0];
}

type Coordinate = {
  value: number | null;
  direction: CoordinateDirection;
};

export type CoordinatesBox = {
  southLatitude: Coordinate;
  northLatitude: Coordinate;
  westLongitude: Coordinate;
  eastLongitude: Coordinate;
};

export default Coordinate;
