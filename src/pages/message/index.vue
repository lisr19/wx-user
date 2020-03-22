<template>
	<div class="msg" ref="msgbox">
		<h1 class="title">消息</h1>
		<div class="msg-content" >
			<ul class="items">
				<li class="item" @click="openMsg">
					<img src="/static/icon/hlicon2.png" alt="">
					<div class="info">
						<div class="header">
							<span class="name">消息通知</span>
							<!--<span>{{msgData.addTime}}</span>-->
						</div>
						<div class="content" v-if="msgN">
							<span >您有新的消息通知</span>
							<em class="num">{{msgN}}</em>
						</div>
					</div>
					<p class="line"></p>
				</li>
				<li class="item" @click="openMsgHealth">
					<img src="/static/icon/msg-health.png" alt="">
					<div class="info">
						<div class="header">
							<span class="name">健康宣教</span>
							<!--<span>{{item.addTime}}</span>-->
						</div>
						<div class="content" v-if="msgE">
							<span >您有新的健康宣教</span>
							<em class="num">{{msgE}}</em>
						</div>
					</div>
					<p class="line"></p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "message",
		// props : ['msgN','msgE'],
		data() {
			return {
				msgList:[],
				page:1,
				size:20,
				total:0,
        msgN:null,
        msgE:null,
        msgNum:null,
			}
		},
		beforeMount() {
			// this.userId = wx.getStorageSync('userId')
      // this.checkNew({userId:this.userId})
		},
    onShow(){
      this.userId = wx.getStorageSync('userId')
      if(this.userId){
        this.checkNew({userId:this.userId})
      }else {
        wx.showModal({
          title:'提示',
          content: '请先绑定手机号码',
          success (res) {
            if (res.confirm) {
              wx.switchTab({url: '../index/main'})
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    },
		methods: {
			openMsg(){
				this.$router.push({path:'/pages/message/msg-list/main'})
			},
			openMsgHealth(){
				this.$router.push({path:'/pages/message/msg-health-list/main'})
			},
      // 查询是否存在新消息
      async checkNew(params){
        await this.$fly.request({
          methods:'get',
          url:"pushMessage/checkNew",
          params
        }).then(res =>{
          if(res.code === 200) {
            this.msgN = res.data.message?res.data.message:0
            this.msgE = res.data.education?res.data.education:0
            this.msgNum =this.msgN + this.msgE
          }}).catch((req)=>{
          console.log(req)
        })
      },
		},
	}
</script>

<style lang="less" scoped>
	.msg{
		background-color: #ffffff;
    min-height: 100%;
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
			padding: 165px 0 100px;
			text-align: left;
			ul{
				li{
					display: flex;
					padding: 48px 40px 24px;
					position: relative;
					.line{
						height: 2px;
						background-color: #E9E9E9;
						width: 80%;
						position: absolute;
						right: 0;
						bottom: 10px;
					}
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
								display: inline-block;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								margin: 10px 0 15px;
							}
							.num{
								position: absolute;
								bottom: 15px;
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
