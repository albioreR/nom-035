import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('America/Tijuana');

export const convertExcelDate = (serialNumber: number) => {
  const timestamp = (serialNumber - 25569) * 86400 * 1000;

  return dayjs.utc(timestamp).format('YYYY-MM-DD');
};

export const formatToDate = (date: string) => {
  return dayjs(date).toDate();
};
