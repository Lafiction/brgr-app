import moment from 'moment';
import 'moment/locale/ru';

export const orderDate = (date: string) => {
  const dateMoment = moment(date, 'YYYYMMDD hh:mm:ss Z');
  const today = moment().startOf('day');
  const yesterday = moment().startOf('day').subtract(1, 'days').startOf('day');
  let result = '';
  if (dateMoment.isSame(today, 'D')) {
    result = 'Сегодня';
  } else if (dateMoment.isSame(yesterday, 'D')) {
    result = 'Вчера';
  } else {
    result = dateMoment.fromNow();
  }
  return `${result}, ${dateMoment.format('HH:mm i-GМTZ')}`;
};
