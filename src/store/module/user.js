import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default {
	state: {
		orderData:{}
	},
	mutations:{
		setOrderData(state, data) {
			state.orderData= data
		},
	},
	getters: {},
	actions: {
		setOrderData(context, data) {
			context.commit('setOrderData', data)
		},
	}
}
