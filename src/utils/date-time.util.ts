import dayjs from 'dayjs';

export class DateTimeUtil {
  static getStartDayTimestamp(): number {
    return dayjs().startOf('day').unix();
  }
}
