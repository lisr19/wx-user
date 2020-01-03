import Vue from 'vue'
import App from './App'
import './common/less/reset.less'
import store from './store'
import fly from './utils/request'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch)
Vue.prototype.$fly = fly
Vue.prototype.$store=store
Vue.prototype.$toast=showToast
Vue.config.productionTip = false

new Vue({
	el: '#app',
	store,
	components: { App },
	template: '<App/>'
})

export function showToast(title) {
	wx.showToast({title:title,icon:'none'})
}

