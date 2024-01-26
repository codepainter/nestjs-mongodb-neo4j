import { DateUtil } from './date.util';

describe('Date Utils', () => {
  describe('toEpoch', () => {
    it('should return the correct epoch', () => {
      const date = new Date('2020-01-01T00:00:00.000Z');
      const epoch = DateUtil.toEpoch(date);
      expect(epoch).toEqual(1577836800);
    });
  });

  describe('fromEpoch', () => {
    it('should return the correct date', () => {
      const epoch = 1577836800;
      const date = DateUtil.fromEpoch(epoch);
      expect(date).toEqual(new Date('2020-01-01T00:00:00.000Z'));
    });
  });

  describe('toFormat', () => {
    it('should return the correct format', () => {
      const date = new Date('2020-01-01T00:00:00.000Z');
      const formatStr = 'yyyy-MM-dd';
      const formattedDate = DateUtil.toFormat(date, formatStr);
      expect(formattedDate).toEqual('2020-01-01');
    });
  });

  describe('fromFormat', () => {
    it('should return the correct date', () => {
      const dateStr = '2020-01-01';
      const formatStr = 'yyyy-MM-dd';
      const date = DateUtil.fromFormat(dateStr, formatStr);
      expect(date).toEqual(new Date('2020-01-01T00:00:00.000Z'));
    });
  });

  describe('getDate', () => {
    it('should return the correct date', () => {
      const date = new Date('2020-01-01T12:00:00.000Z');
      const dateOnly = DateUtil.getDate(date);
      expect(dateOnly).toEqual('2020-01-01');
    });
  });

  describe('getTime', () => {
    it('should return the correct time', () => {
      const date = new Date('2020-01-01T12:00:00.000Z');
      const timeOnly = DateUtil.getTime(date);
      expect(timeOnly).toEqual('12:00:00');
    });
  });

  describe('isValid', () => {
    it('should return true if date is valid', () => {
      const date = new Date('2020-01-01T12:00:00.000Z');
      const isValid = DateUtil.isValid(date);
      expect(isValid).toEqual(true);
    });
  });
});
