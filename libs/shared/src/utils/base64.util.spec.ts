import { Base64Util } from './base64.util';

describe('base64.util', () => {
  describe('encodeFromJson', () => {
    it('should encode object to base64 string', () => {
      // Arrange
      const obj = { name: 'John Doe', age: 20 };
      const expected = 'eyJuYW1lIjoiSm9obiBEb2UiLCJhZ2UiOjIwfQ==';
      // Act
      const actual = Base64Util.encodeFromJson(obj);
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('decodeToJson', () => {
    it('should decode base64 string to object', () => {
      // Arrange
      const str = 'eyJuYW1lIjoiSm9obiBEb2UiLCJhZ2UiOjIwfQ==';
      const expected = { name: 'John Doe', age: 20 };
      // Act
      const actual = Base64Util.decodeToJson(str);
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
