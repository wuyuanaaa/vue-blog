/**
 * 格式化时间为 **前
 * @param {string} date
 */
export function formatTime(date) {
  const now = new Date()
  date = new Date(date)
  // 年
  const nowYear = now.getFullYear()
  const dateYear = date.getFullYear()
  if (nowYear > dateYear) {
    return Math.floor(nowYear - dateYear) + '年前'
  }
  // 月
  const nowMonth = now.getMonth()
  const dateMonth = date.getMonth()
  if (nowMonth > dateMonth) {
    return Math.floor(nowMonth - dateMonth) + '个月前'
  }
  // 日
  const nowDay = now.getDate()
  const dateDay = date.getDate()
  if (nowDay > dateDay) {
    return Math.floor(nowDay - dateDay) + '天前'
  }
  // 小时
  const nowHours = now.getHours()
  const dateHours = date.getHours
  if (nowHours > dateHours) {
    return Math.floor(nowHours - dateHours) + '小时前'
  }
  // 分
  const nowMin = now.getMinutes()
  const dateMin = date.getMinutes()
  if (nowMin > dateMin) {
    return Math.floor(nowMin - dateMin) + '分钟前'
  }
  // 时间差小于一分钟
  return '刚刚'
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

// 判断移动端
let ISMOBILE

export function isMobile() {
  if (ISMOBILE !== undefined) {
    return ISMOBILE
  }
  ISMOBILE = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
  return ISMOBILE
}
