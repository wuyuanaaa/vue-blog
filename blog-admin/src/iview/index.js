import {
  Form,
  FormItem,
  Button,
  Table,
  Menu,
  MenuItem,
  Row,
  Col,
  Icon,
  Input,
  Page,
  Modal,
  Tag
} from 'iview';

const iview = {
  install: function (Vue) {
    Vue.component('Form', Form);
    Vue.component('FormItem', FormItem);
    Vue.component('Button', Button);
    Vue.component('Table', Table);
    Vue.component('Menu', Menu);
    Vue.component('MenuItem', MenuItem);
    Vue.component('Row', Row);
    Vue.component('Col', Col);
    Vue.component('Icon', Icon);
    Vue.component('Input', Input);
    Vue.component('Page', Page);
    Vue.component('Modal', Modal);
    Vue.component('Tag', Tag);
  }
};
export default iview;
