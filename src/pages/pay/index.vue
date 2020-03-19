<template>
	<div class="main">
		<div class="hotel-infor">
			<img v-if="selectImg" :src="selectImg" alt="">
			<div class="hotel-content">
				<p class="type">{{selectName}}</p>
				<p class="desc" v-if="selectChild">{{selectChild}}</p>
				<p class="desc" v-else>{{selectContent}}</p>
				<p class="date">{{showTime}}</p>
				<p class="price"><span>{{totalPrice}}元</span></p>
			</div>
		</div>
		<div class="pay-type">
			<div class="item">
				<div>
					<img src="/static/icon/wx.png" alt="">
					<span>微信</span>
				</div>
			</div>
		</div>
		<div class="pay-detail">
			<p class="total-price">
				<span>总价</span>
				<span>¥{{totalPrice}}</span>
			</p>
		</div>
		<div class="notice">
			我同意<span @click="openPro" style="color: blue">互联网+护理服务协议</span>, 我也同意支付以下所示的总金额（含服务费）
			<span @click="isSelect=!isSelect">
	            <em class="icon" v-if="!isSelect"></em>
	            <img class="icon-select" v-else src="/static/icon/yes.png" alt="">
             </span>
		</div>
		<div class="btn" @click="surePay">预定确认·￥{{totalPrice}}</div>
	</div>
</template>

<script>

	export default {
		data(){
			return{
				selectImg:'',
				selectName:'',
				selectContent:'',
				selectChild:'',
				showTime:'',
				totalPrice:0,
				orderData:{},
				isSelect:true,
				payList:[], //付款方式列表
				payType:''
			}
		},
		beforeMount(){
			console.log(this.$route.query);
			this.orderId = this.$route.query.orderId
			this.totalPrice = this.$route.query.totalPrice
			this.selectName = this.$route.query.selectName
			this.selectImg = this.$route.query.selectImg
			this.selectContent = this.$route.query.selectContent
			this.showTime = this.$route.query.showTime
		},
		mounted(){
		},
		methods: {
			goBack(){
				MessageBox.confirm('您尚未完成付款，确定退出吗？').then(action => {
					if(action==='confirm'){
						if(this.$route.query&&this.$route.query.from==='下订单'){
							this.$router.go(-2)
							setTimeout(()=>{
								this.$router.push({ name:'订单详情',query:{orderId:this.orderId}});
							},10)
						}else {
							this.$router.back()//返回上一层
						}
					}
				}).catch(() => {
					console.log('取消');
				})
			},
			openPro(){
				this.$router.push({path:'/pages/register/user-prot/main'})
			},
			async surePay(){
				if(!this.isSelect){
					this.$toast('您未同意相关服务协议')
					return
				}
				let params ={
					orderId:this.orderId
				}
				await this.$fly.request({
					method:'post',
					url:"orderList/pay",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.$router.push({path:'/pages/pay/pay-success/main',query:{orderId:this.orderId}})
					}}).catch((req)=>{
					console.log(req)
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.main{
		padding: 90px 40px;
		.hotel-infor{
			margin: 36px 0;
			display: flex;
			img{
				width:176px;
				height:176px;
				display: block;
			}
			.hotel-content{
				font-size:28px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(72,72,72,1);
				line-height:40px;
				text-align: left;
				margin-left: 32px;
				flex: 1;
				.type{
					font-size:28px;
					font-family:PingFangSC;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:40px;
				}
				.desc{
					margin-top: 10px;
					font-size:24px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:34px;
				}
				.price{
					font-size:32px;
					font-family:PingFangSC-Semibold;
					font-weight:600;
					color:rgba(217,47,47,1);
					line-height:44px;
					margin-top: 8px;
					span{
						font-weight:400;
						font-size:26px;
					}
					em{
						font-weight:400;
						font-size:26px;
						color: #555555;
					}
				}
			}
		}
		.pay-type{
			.item{
				/*width:670px;*/
				width: 100%;
				height: 88px;
				border-bottom:solid #D4D4D4FF 1px; /*no*/
				border-top:solid #D4D4D4FF 1px; /*no*/
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size:24px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:34px;
				i{
					color: #999999FF;
					font-size: 45px;
				}
				>div{
					display: flex;
					align-items: center;
					img{
						width:48px;
						height:48px;
						margin-right: 52px;
					}
				}
			}
		}
		.pay-detail{
			font-size:28px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:40px;
			padding: 36px 0 98px;
			>p{
				display: flex;
				justify-content: space-between;
				margin-bottom: 20px;
			}
			.total-price{
				font-size:32px;
				font-family:PingFangSC-Semibold;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:44px;
			}
		}
		.notice{
			font-size:28px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:40px;
			border-bottom:solid #D4D4D4FF 1px; /*no*/
			border-top:solid #D4D4D4FF 1px; /*no*/
			padding: 36px 0;
			text-align: left;
			position: relative;
			a{
				color:#626BFD;
			}
			.icon{
				width:34px;
				height:34px;
				border-radius: 50%;
				border: solid #d6d6d6 1px;
				display: block;
				position: absolute;
				bottom: 20px;
				right: 10px;
			}
			.icon-select{
				width:34px;
				height:34px;
				color: #628CFD;
				display: block;
				position: absolute;
				bottom: 20px;
				right: 10px;
			}
		}
		.btn{
			/*width:670px;*/
			width: 90%;
			height:90px;
			line-height: 90px;
			background:rgba(71,189,195,1);
			border-radius:6px;
			font-size:32px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(255,255,255,1);
			border: none;
			margin:  250px auto 0;
			text-align: center;
		}
	}
</style>

