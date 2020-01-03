import Config from '@/Config'

import Fly from 'flyio/dist/npm/wx'
let fly = new Fly
const token = wx.getStorageSync('token')
fly.config.timeout = 30000 // 超时
fly.config.baseURL = Config.baseURL // 基地址,配置在一个文件中。
fly.config.params = {} // 设置公共参数



//添加请求拦截器
fly.interceptors.request.use((request) => {
	wx.showLoading({
		title: "加载中",
		mask:true
	});
	request.headers['content-type']= 'application/json';
	if (wx.getStorageSync('token')) {
		request.headers.authorization = wx.getStorageSync('token')
	}
	return request;
});

//添加响应拦截器
fly.interceptors.response.use(
	(response) => {
		wx.hideLoading();
		return response.data;//请求成功之后将返回值返回
	},
	(err) => {
		//请求出错，根据返回状态码判断出错原因
		console.log(err);
		wx.hideLoading();
		if(err){
			return "请求失败";
		}
	}
);

export default fly;