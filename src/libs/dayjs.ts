
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function toRFC3339(date: Date): string {
    return dayjs(date).utc().format('YYYY-MM-DD HH:mm:ss Z');
}
