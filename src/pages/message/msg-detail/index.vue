<template>
	<div class="msg">
		<div class="content">
			<p class="time"> <span>通知时间：</span><br>{{msg.addTime}}</p>
			<div class="desc"><span>消息内容：</span><br>{{msg.message}}</div>
			<div class="add-time">{{msg.addTime}}</div>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				msg:{}
			}
		},
		onLoad(options) {
			this.msg=JSON.parse(options.msg)
		},
		beforeMount() {
		},
		mounted(){

		},
		methods: {

		},
	}
</script>

<style lang="less" scoped>
	.msg{
		background:rgba(248,249,251,1);
		.content{
			width: 90%;
			background:rgba(255,255,255,1);
			border-radius:8px;
			margin: 0 auto;
			text-align: left;
			color: #6991FE;
			padding: 40px 16px 70px 26px;
			position: revert;
			.desc{
				font-size:32px;
				font-family:PingFangSC;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height: 2;
				span{
					font-family:PingFangSC;
					font-weight:600;
					color:rgba(51,51,51,1);
				}
			}
			p{
				font-size:28px;
				margin-bottom: 24px;
				span{
					font-size:28px;
					font-family:PingFangSC;
					font-weight:600;
					color:rgba(51,51,51,1);
				}
			}
			.add-time{
				font-size: 14px;
				position: absolute;
				font-weight: 400;
				color: #999999;
				right: 40px;
				bottom: 30px;
			}
		}
	}
</style>
