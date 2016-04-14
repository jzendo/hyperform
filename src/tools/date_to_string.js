'use strict';


import sprintf from './sprintf';
import get_week_of_year from './get_week_of_year';


function pad(num, size=2) {
  var s = num+"";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

/**
 * calculate a string from a date according to HTML5
 */
export default function(date, element_type) {
  switch (element_type) {
    case 'date':
      return sprintf('%s-%s-%s', date.getFullYear(), date.getUTCMonth() + 1,
          date.getUTCDate());

    case 'month':
      return sprintf('%s-%s', date.getFullYear(), date.getUTCMonth() + 1);

    case 'week':
      let params = get_week_of_year(date);
      params.unshift('%s-W%s');
      return sprintf.apply(null, params);

    case 'time':
      return sprintf('%s:%s:%s.%s',
          pad(date.getUTCHours()),
          pad(date.getUTCMinutes()),
          pad(date.getUTCSeconds()),
          pad(date.getUTCMilliseconds(), 3)).replace(/(:00)?\.000$/, '');
  }

  return null;
}
