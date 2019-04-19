export function formatTime (date) {
  let time = '';
  let now = +new Date();
  date = new Date(date);

  let passTime = now - date;
  if (passTime < 60 * 1000) {
    time = '刚刚';
  } else if (passTime < 3600 * 1000) {
    time = Math.floor(passTime / (60 * 1000)) + '分钟前';
  } else if (passTime < 24 * 3600 * 1000) {
    time = Math.floor(passTime / (60 * 60 * 1000)) + '小时前';
  } else if (passTime < 365 * 24 * 3600 * 1000) {
    time = Math.floor(passTime / (60 * 60 * 1000)) + '年前';
  }

  return time;
}
