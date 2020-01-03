<template>
	<div class="msg">
		<div class="msg-content" >
			<ul class="items" v-if="msgList.length">
				<li class="item" v-for="item in msgList" :key="index" @click="openDetail(item)">
					<img src="/static/icon/hlicon2.png" alt="">
					<div class="info">
						<div class="header">
							<span class="name">{{item.name ? item.name:'消息通知'}}</span>
							<span>{{item.addTime}}</span>
						</div>
						<div class="content">
							<span>{{item.message}}</span>
							<span class="num" v-if="item.flag=== 0">1</span>
						</div>
					</div>
				</li>
			</ul>
			<div  v-if="msgList.length===0" class="msg-null">
				<img  src="/static/icon/null-news.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "message",
		data() {
			return {
				msgList:[],
				page:1,
				size:100,
				total:0,
				clientHeight:'',
				boxHeight:'',
				loading:false,
			}
		},

		onShow() {
			this.userId = wx.getStorageSync('userId')
			this.getMsgList({userId :this.userId,size:this.size,page:1})
		},
		mounted(){
			setInterval(()=>{ //5分钟更新一次数据
				this.msgList=[]
				this.getMsgList({userId :this.userId,size:this.size,page:1})
			},1000*60*5)
		},
		methods: {
			// 获取消息列表
			async getMsgList(params){
				await this.$fly.request({
					methods:'get',
					url:"pushMessage/listMessage",
					params })
					.then(res => {
						if(res.code === 200) {
							this.total = res.data.total
							if(this.page===1){
								this.msgList=res.data.list
							}else {
								this.msgList= this.msgList.concat(res.data.list)
							}
						}})
			},
			// 消息设为已读
			async updateFlag(params){
				await this.$fly.request({
					method:'put',
					url:"pushMessage/updateFlag1Many",
					params
				}).then(res =>{
					if(res.code === 200) {
						console.log('设为已读成功');
					}}).catch((req)=>{
					console.log(req)
				})
			},
			openDetail(item){
				this.updateFlag({ids:item.id})
				let msg = JSON.stringify(item)
				// wx.navigateTo({ url:'../../message/msg-detail/main',query:{id:item.id,msg:item}})
				this.$router.push({path:'/pages/message/msg-detail/main',query:{id:item.id,msg:msg}})
			}
		},
	}
</script>


<style lang="less" scoped>
	.msg{
		background:#ffffff;
		.title{
			position: fixed;
			top: 0;
			width: 100%;
			background:rgba(247,247,247,1);
			padding: 48px 40px ;
			z-index: 9;
			font-size:48px;
			font-weight:600;
			color:rgba(72,72,72,1);
			line-height:66px;
			text-align: left;
		}
		.msg-content{
			text-align: left;
			ul{
				li{
					display: flex;
					padding: 15px 40px;
					img{
						width:92px;
						height:92px;
						background:rgba(71,189,195,1);
						border-radius: 50%;
						overflow: hidden;
						margin-right: 28px;
					}
					.info{
						display: flex;
						justify-content: center;
						flex-direction: column;
						flex: 1;
						border-bottom: 2px solid #E9E9E9;
						.header{
							font-size:22px;
							font-family:PingFangSC;
							font-weight:400;
							color:rgba(153,153,153,1);
							display: flex;
							justify-content: space-between;
							.name{
								font-size:28px;
								font-family:PingFangSC;
								font-weight:400;
								color:rgba(51,51,51,1);
							}
						}
						.content{
							font-size:24px;
							font-family:PingFangSC;
							font-weight:400;
							color:rgba(102,102,102,1);
							position: relative;
							span{
								width: 480px;
								display: inline-block;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								margin: 10px 0 15px;
							}
							.num{
								position: absolute;
								bottom: 5px;
								right: 0px;
								width:36px;
								height:36px;
								line-height: 36px;
								text-align: center;
								background:rgba(255,90,96,1);
								font-size:22px;
								font-family:PingFangSC-Regular,PingFangSC;
								font-weight:400;
								color:rgba(255,255,255,1);
								border-radius: 60%;
								overflow: hidden;
							}
						}
					}
				}
			}
		}
		.msg-null{
			display: flex;
			align-items: center;
			justify-content: center;
			img{
				width:262px;
				margin-top: 250px;
			}
		}
	}
</style>
