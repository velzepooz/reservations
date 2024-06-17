import dayjs from 'dayjs';

export class DateTimeUtil {
  static getStartDayTimestamp(date: Date = new Date()): number {
    return dayjs(date).startOf('day').unix();
  }

  static addDays(countOfDays: number, dateToAddTo: Date = new Date()): Date {
    return dayjs(dateToAddTo).add(countOfDays, 'days').toDate();
  }

  static toDayString(date: number | Date = new Date()): string {
    return dayjs(date).format('YYYY-MM-DD');
  }
}
