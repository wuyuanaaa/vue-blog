import {
  Input,
  Modal,
  Tag
} from 'iview'

const iview = {
  install: function(Vue) {
    Vue.component('Input', Input)
    Vue.component('Modal', Modal)
    Vue.component('Tag', Tag)
  }
}
export default iview
