<template>
	<div class="main">
		<img src="/static/icon/success.png" alt="">
		<p class="tip1">支付完成</p>
		<p class="tip2">您已成功预订，已加入您的订单</p>
		<div class="btn" @click="openOrder">查看订单</div>
		<div class="btn close" @click="close">关闭</div>
	</div>
</template>

<script>

	export default {

		data(){
			return{
			}
		},
		onShow(){
			this.orderId = this.$route.query.orderId
		},
		methods: {
			openOrder(){
				wx.switchTab({url: '../../order/main'})
				// this.$router.push({ name:'订单详情',query:{orderId:this.orderId}});
			},
			close(){
				wx.switchTab({url: '../../index/main'})
			}
		}
	}
</script>

<style lang="less" scoped>
	.main{
		padding: 90px 40px;
		text-align: center;
		img{
			width:186px;
			height:186px;
			margin: 86px 0 56px;
		}
		.tip1{
			height:44px;
			font-size:32px;
			font-family:PingFangSC;
			font-weight:600;
			color:rgba(51,51,51,1);
			line-height:44px;
		}
		.tip2{
			font-size:24px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(153,153,153,1);
			line-height:34px;
			margin: 20px 0 120px;
		}
		.btn{
			/*width:480px;*/
			width: 70%;
			height:80px;
			line-height: 80px;
			background:rgba(71,189,195,1);
			border-radius:10px;
			margin: 0 auto 50px;
			font-size:36px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(255,255,255,1);
			border: none;
			display: block;
			text-align: center;
		}
		.close{
			background:rgba(244,244,244,1);
			border:2px solid rgba(151,151,151,1);
			color:rgba(51,51,51,1);
		}
	}
</style>

