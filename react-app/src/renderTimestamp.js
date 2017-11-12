const MONTHS = 'January February March April May June July August September October November December'.split(' ');

export default ([d, m, y, h, min]) =>
  d + ' ' + MONTHS[m] + ' ' + y + ' - ' + (h >= 10 ? h : '0' + h) + (min >= 10 ? min : '0' + min);
