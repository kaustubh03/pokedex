import { MONTHS_ARRAY_SHORT } from '../constants/dateConstants';

export function getDateAfterDays(nDays, date = new Date()) {
  let currentDate = new Date(date.getTime());
  currentDate.setDate(currentDate.getDate() + nDays);
  return currentDate;
}

export const convertToFormat = (date, format = 'mm-dd-yyyy', nappendZero) => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (!nappendZero) {
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  }

  let finalDate;
  const separator = format.indexOf('/') > -1 ? '/' : '-';
  switch (format.toLowerCase()) {
    case 'mm-dd-yyyy' || 'mm/dd/yyyy':
      finalDate = [month, day, year].join(separator);
      break;
    case 'dd-mm-yyyy' || 'dd/mm/yyyy':
      finalDate = [day, month, year].join(separator);
      break;
    case 'yyyy-mm-dd' || 'yyyy/mm/dd':
      finalDate = [year, month, day].join(separator);
      break;
    case 'yyyy/dd/mm' || 'yyyy-dd-mm':
      finalDate = [year, day, month].join(separator);
      break;
    case 'ddmmm':
      finalDate = `${date.getDate()} ${MONTHS_ARRAY_SHORT[date.getMonth()]}`;
      break;
    default:
      finalDate = [day, month, year].join(separator);
  }

  return finalDate;
};

export const daysBetween = (date1, date2) => {
  // The number of milliseconds in one day
  let ONE_DAY = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds and set to midnight
  let date1Obj = new Date(date1).setHours(0, 0, 0, 0);
  let date2Obj = new Date(date2).setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  let diff = Math.abs(date2Obj - date1Obj);

  // Convert back to days and return
  return Math.ceil(diff / ONE_DAY);
};

export const getDateFromString = (dateStr, format = 'dd/mm/yyyy') => {
  if (typeof dateStr === 'string' && dateStr.length > 0) {
    let day, month, year;
    const separator = format.indexOf('/') > -1 ? '/' : '-';
    switch (format.toLowerCase()) {
      case 'dd-mm-yyyy':
      case 'dd/mm/yyyy':
        [day, month, year] = dateStr.split(separator);
        break;
      default:
        break;
    }
    // standard format : YYYY-MM-DD
    return new Date([year, month, day].join('-'));
  }
};

export const getTimeinAmPm = timeString => {
  //input: 00:00:00
  var hourEnd = timeString.indexOf(':');
  var H = +timeString.substr(0, hourEnd);
  var h = H % 12 || 12;
  var ampm = H < 12 || H === 24 ? ' AM' : ' PM';
  return h + timeString.substr(hourEnd, 3) + ampm;
};

export const formatDate = (
  dateOb,
  isMonthStr = false,
  isTimeDisplay = false
) => {
  let dateObj = new Date(dateOb);
  let day = dateObj.getDate().toString();
  let month = (dateObj.getMonth() + 1).toString();
  day = day.length < 2 ? '0' + day : day;
  month = month.length < 2 ? '0' + month : month;

  let monthStr = MONTHS_ARRAY_SHORT[dateObj.getMonth()];
  let returnDate;
  if (isMonthStr) {
    returnDate = `${day} ${monthStr} ${dateObj.getFullYear()}`;
  } else if (isTimeDisplay) {
    const addZero = time => {
      return time.toString().length < 2 ? '0' + time.toString() : time;
    };
    returnDate = `${dateObj.getFullYear()}-${month}-${day} ${addZero(
      dateObj.getHours()
    )}:${addZero(dateObj.getMinutes())}:${addZero(dateObj.getSeconds())}`;
  } else {
    returnDate = `${day}-${month}-${dateObj.getFullYear()}`;
  }
  return returnDate;
};

export const getTwoWeekStrDate = () => {
  const today = new Date();
  const twoDayLater = getDateAfter(today, 2);
  const twoDayStr = getFormattedDateStr(twoDayLater);
  const lastDayDate = getDateAfter(twoDayLater, 14);
  const lastDayStr = getFormattedDateStr(lastDayDate);
  return twoDayStr + ' to ' + lastDayStr;
};

export const getFourWeekStrDate = () => {
  const today = new Date();
  const twoDayLater = getDateAfter(today, 2);
  const twoDayStr = getFormattedDateStr(twoDayLater);
  const lastDayDate = getDateAfter(twoDayLater, 28);
  const lastDayStr = getFormattedDateStr(lastDayDate);
  return twoDayStr + ' to ' + lastDayStr;
};

function getFormattedDateStr(passedDate) {
  // const dd = String(passedDate.getDate()).padStart(2, '0');
  // const mm = String(passedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  // const mm = passedDate.toLocaleString('en-us', { month: 'short' });
  // const dateStr = dd + '/' + mm
  const formattedDate = passedDate
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    })
    .replace(/ /g, ' ');
  return formattedDate;
}

function getDateAfter(passedDate, days) {
  var newDate = passedDate;
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
