import Vue from 'vue'
import App from './App.vue'
import '@/styles/index'
import '@/libs/iRegion/region.css'

import '@/assets/fonts/iconfont.css';
import ViewUI from "view-design"
import iViewPro from "@/libs/iview-pro/iview-pro.min.js" 

// 导入 iView 和 iView Pro 的样式
import 'view-design/dist/styles/iview.css';
import '@/libs/iview-pro/iview-pro.css';

// 省市区联动
import iRegion from '@/libs/iRegion/region.min.js'

Vue.use(ViewUI)
Vue.use(iViewPro);
Vue.use(iRegion)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
