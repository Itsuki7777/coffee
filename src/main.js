import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar).use(TabbarItem);
import { Search } from "vant";
Vue.use(Search);
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
import { Lazyload } from "vant";
Vue.use(Lazyload);
import { Toast } from "vant";
Vue.use(Toast);
import { Tab, Tabs } from "vant";
Vue.use(Tab).use(Tabs);
import { SubmitBar } from "vant";
Vue.use(SubmitBar);
import { Empty } from "vant";
Vue.use(Empty);
import { Form } from "vant";
Vue.use(Form);
import { Field } from 'vant';
Vue.use(Field);
import {CellGroup} from 'vant';
Vue.use(CellGroup);
import { Popup } from "vant";
Vue.use(Popup);
import { Button } from "vant";
Vue.use(Button);
import { Uploader } from "vant";
Vue.use(Uploader);
import { Dialog } from 'vant';
Vue.use(Dialog);
import { Stepper } from 'vant';
Vue.use(Stepper);
import { RadioGroup, Radio } from 'vant';
Vue.use(Radio);
Vue.use(RadioGroup);
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

import axios from "axios";
Vue.prototype.axios = axios;

let token = localStorage.getItem("TOKEN") || "";
Vue.prototype.$token = token;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=utf-8";

//axios.defaults.baseURL = '/apis'

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
