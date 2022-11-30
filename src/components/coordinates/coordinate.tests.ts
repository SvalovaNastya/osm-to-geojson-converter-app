import { isValid } from './coordinate';

describe('Coordinate validator', () => {
  describe('latitude', () => {
    it('normal', () => {
      const validationResult = isValid(0, 'latitude');
      expect(validationResult).toBe(true);
    });
    it('more than range', () => {
      const validationResult = isValid(91, 'latitude');
      expect(validationResult).toBe(false);
    });
    it('less than range', () => {
      const validationResult = isValid(-91, 'latitude');
      expect(validationResult).toBe(false);
    });
    it('equals the edge', () => {
      const validationResult = isValid(-90, 'latitude');
      expect(validationResult).toBe(true);
    });
    it('float', () => {
      const validationResult = isValid(13.123, 'latitude');
      expect(validationResult).toBe(true);
    });
  });
  describe('longitude', () => {
    it('normal', () => {
      const validationResult = isValid(0, 'longitude');
      expect(validationResult).toBe(true);
    });
    it('more than range', () => {
      const validationResult = isValid(181, 'longitude');
      expect(validationResult).toBe(false);
    });
    it('less than range', () => {
      const validationResult = isValid(-181, 'longitude');
      expect(validationResult).toBe(false);
    });
    it('equals the edge', () => {
      const validationResult = isValid(-180, 'longitude');
      expect(validationResult).toBe(true);
    });
    it('float', () => {
      const validationResult = isValid(13.123, 'longitude');
      expect(validationResult).toBe(true);
    });
  });
});
