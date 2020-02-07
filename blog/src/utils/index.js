/**
 * 格式化时间为 **前
 * @param {string} date
 */
export function formatTime(date) {
  let time = ''
  const now = +new Date()
  date = new Date(date)

  const passTime = now - date
  if (passTime < 60 * 1000) {
    time = '刚刚'
  } else if (passTime < 3600 * 1000) {
    time = Math.floor(passTime / (60 * 1000)) + '分钟前'
  } else if (passTime < 24 * 3600 * 1000) {
    time = Math.floor(passTime / (60 * 60 * 1000)) + '小时前'
  } else if (passTime < 365 * 24 * 3600 * 1000) {
    time = Math.floor(passTime / (24 * 3600 * 1000)) + '天前'
  } else {
    time = Math.floor(passTime / (365 * 24 * 3600 * 1000)) + '年前'
  }

  return time
}

/**
 * 跟 fmt 字符串格式化时间
 * @param {string} date
 * @param {string} fmt
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/**
 * 防抖
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 */
export function debounce(func, wait, immediate) {
  var timeout, result
  var debounced = function() {
    var context = this
    var args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
