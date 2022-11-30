import createUrl from './url';

describe('UrlHelper', () => {
  describe('combine base url and relative url', () => {
    it('normal', () => {
      const url = createUrl('https://example.com/', 'example');
      expect(url).toBe('https://example.com/example');
    });
    it('double slashes', () => {
      const url = createUrl('https://example.com/', '/example');
      expect(url).toBe('https://example.com/example');
    });
    it('no slash', () => {
      const url = createUrl('https://example.com', 'example');
      expect(url).toBe('https://example.com/example');
    });
    it('do not add empty', () => {
      const url = createUrl('https://example.com/', '');
      expect(url).toBe('https://example.com/');
    });
  });
  describe('combine search params', () => {
    it('string param', () => {
      const url = createUrl('https://example.com/', 'example', { key: 'value' });
      expect(url).toBe('https://example.com/example?key=value');
    });
    it('number param', () => {
      const url = createUrl('https://example.com/', 'example', { key: 22 });
      expect(url).toBe('https://example.com/example?key=22');
    });
    it('multiple param', () => {
      const url = createUrl('https://example.com/', 'example', { key1: 22, key2: 'value' });
      expect(url).toBe('https://example.com/example?key1=22&key2=value');
    });
    it('string array param', () => {
      const url = createUrl('https://example.com/', 'example', { key: ['value1', 'value2'] });
      expect(url).toBe('https://example.com/example?key=value1%2Cvalue2');
    });
    it('number array param', () => {
      const url = createUrl('https://example.com/', 'example', { key: [11, 22] });
      expect(url).toBe('https://example.com/example?key=11%2C22');
    });
  });
});
