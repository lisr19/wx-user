<template>
	<div class="msg">
		<div class="msg-content" >
			<ul class="items" v-if="msgList.length">
				<li class="item" v-for="item in msgList" :key="index" @click="openDetail(item)">
					<p class="title"><span >{{item.title}} </span><img src="/static/icon/hlicon2.png" alt=""></p>
					<div class="content">
						<div class="txt" v-text="item.message"></div>
						<p class="time"><span>{{item.addTime}}</span><Icon type="ios-arrow-forward"/><em class="num" v-if="item.flag===0">1</em></p>
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
	// import {getMsgHealList,updateFlag} from '@/lib/API/comment'
	export default {
		name: "message",
		data() {
			return {
				msgList:[],
				page:1,
				size:30,
				total:0,
			}
		},
		beforeMount() {
			this.userId = wx.getStorageSync('userId')
			this.getMsgHealList({userId :this.userId,size:this.size,page:1})
		},
		methods: {
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
			// 获取消息列表
			async getMsgHealList(params){
				await this.$fly.request({
					methods:'get',
					url:"pushMessage/listEducation",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.total = res.data.total
						if(this.page===1){
							this.msgList=res.data.list
						}else {
							this.msgList= this.msgList.concat(res.data.list)
						}
					}}).catch((req)=>{
					console.log(req)
				})
			},
			openDetail(item){
				this.updateFlag({ids:item.id})
				let msg = JSON.stringify(item)
				this.$router.push({path:'/pages/message/msg-health-detail/main',query:{educationId:item.educationId,msg:msg}})
			}
		},
	}
</script>

<style>
	page{
		color: #2c3e50;
		background:rgba(247,247,247,1);
	}
</style>
<style lang="less" scoped>
	.msg{
		.msg-content{
			text-align: left;
			.items{
				display: flex;
				justify-content: center;
				text-align: left;
				flex-direction: column;
				.item{
					height:258px;
					background:rgba(255,255,255,1);
					border-radius:10px;
					width: 94%;
					margin: 40px auto 0;
					.title{
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 36px 0 16px;
						font-size:32px;
						font-family:PingFangSC-Medium,PingFangSC;
						font-weight:500;
						color:rgba(51,51,51,1);
						height:74px;
						background:rgba(44,225,161,0.1);
						border-radius:10px 10px 0px 0px;
						span{
							flex: 1;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
						img{
							width:42px;
							height:44px;
						}
					}
					.content{
						padding: 32px 18px;
						overflow: hidden;
						.txt{
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
							font-size:26px!important;
							font-family:PingFangSC-Regular,PingFangSC;
							font-weight:400;
							color:rgba(102,102,102,1);
							line-height:34px;
						}
						.time{
							margin-top: 24px;
							font-size:24px;
							font-family:PingFangSC-Regular,PingFangSC;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height:32px;
							display: flex;
							justify-content: space-between;
							align-items: center;
							position: relative;
							.num{
								position: absolute;
								bottom: 0px;
								right: 50px;
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
							.ivu-icon-ios-arrow-forward{
								font-size: 38px;
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
