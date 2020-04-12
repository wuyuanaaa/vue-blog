
function inserted(el, binding, vnode) {
  const url = el.src

  imgIsExist(url).catch(() => {
    imgOnError(el, url)
  })
}

function imgReload(e) {
  e.stopPropagation()
  const img = e.target
  const oldUrl = img.dataset.oldUrl
  // 移除事件，防止重复监听
  img.removeEventListener('click', imgReload)
  // 重新尝试加载图片
  imgIsExist(oldUrl)
    .then(() => {
      // 加载成功时移除监听，无需再次重新加载
      imgOnSuccess(img)
    })
    .catch(() => {
      imgOnError(img, oldUrl)
    })
}

function imgOnError(el, url) {
  el.dataset.oldUrl = url
  el.setAttribute('src', 'https://i.loli.net/2020/04/12/HYQG2Stvo9sTb6M.jpg')
  el.title = '图片加载失败，点击重试'

  el.addEventListener('click', imgReload)
}

function imgOnSuccess(el) {
  el.title = ''
  el.removeEventListener('click', imgReload)
}

function imgIsExist(url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = function() {
      if (this.complete) {
        resolve()
        img = null
      }
    }
    img.onerror = function(e) {
      reject(e)
      img = null
    }
    img.src = url
  })
}

export default {
  inserted
}
