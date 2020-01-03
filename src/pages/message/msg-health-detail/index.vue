<template>
	<div class="msg">
		<div class="content">
			<p class="title">《{{message.title}}》</p>
			<!--<p class="time">{{msg-list.addTime}}</p>-->
			<!--<div v-html="message.desc" class="desc"></div>-->
			<rich-text class="desc" :nodes="msgDesc"></rich-text>
		</div>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				message:{},
				msgDesc:''
			}
		},
		onLoad(options) {
			this.message=JSON.parse(options.msg)
		},
		beforeMount() {
			this.educationId=this.$route.query.educationId
			this.getEducDetail({educationId:this.educationId})
		},
		methods: {
			async getEducDetail(params){
				await this.$fly.request({
					methods:'get',
					url:"pushMessage/getEducationDetail",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.msgDesc = res.data
					}else {
						this.msgDesc = res.message
					}
				}).catch((req)=>{
					console.log(req)
				})
			}
		},
	}
</script>

<style scoped>
	.desc>>>a{
		display: none;
	}
</style>
<style lang="less" scoped>
	.msg{
		background-color: #ffffff;
		min-height: 100%;
		.content{
			width: 100%;
			background:rgba(255,255,255,1);
			padding: 46px 40px;
			margin: 0 auto;
			text-align: left;
			.title{
				font-size:32px;
				font-family:PingFangSC-Medium,PingFangSC;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:44px;
			}
			.time{
				font-size:22px;
				font-family:PingFangSC-Regular,PingFangSC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:32px;
				margin: 16px 0 32px;
			}
			.desc{
				font-size:28px;
				font-family:PingFangSC-Regular,PingFangSC;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:40px;
				word-break: break-all;
			}
		}
	}
</style>
