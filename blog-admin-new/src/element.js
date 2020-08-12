import Vue from 'vue'
import {
  Button,
  Select,
  Form,
  FormItem,
  Input
} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
