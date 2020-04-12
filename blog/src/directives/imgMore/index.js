import imgMore from './imgMore'

const install = function(Vue) {
  Vue.directive('imgMore', imgMore)
}

if (window.Vue) {
  window['imgMore'] = imgMore
  Vue.use(install) // eslint-disable-line
}

imgMore.install = install

export default imgMore
