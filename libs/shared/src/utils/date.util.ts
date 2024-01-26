import { DateTime } from 'luxon';

export class DateUtil {
  static toEpoch(date: Date): number {
    return DateTime.fromJSDate(date).toSeconds();
  }

  static fromEpoch(epoch: number): Date {
    return DateTime.fromSeconds(epoch).toJSDate();
  }

  static toFormat(date: Date, formatStr: string): string {
    return DateTime.fromJSDate(date).toUTC().toFormat(formatStr);
  }

  static fromFormat(dateStr: string, fmt: string): Date {
    return DateTime.fromFormat(dateStr, fmt, { zone: 'utc' }).toJSDate();
  }

  static getDate(date: Date): string {
    return DateTime.fromJSDate(date)
      .toUTC()
      .startOf('day')
      .toFormat('yyyy-MM-dd');
  }

  static getTime(date: Date): string {
    return DateTime.fromJSDate(date)
      .toUTC()
      .startOf('second')
      .toFormat('HH:mm:ss');
  }

  static isValid(date: Date): boolean {
    return DateTime.fromJSDate(date).isValid;
  }
}
