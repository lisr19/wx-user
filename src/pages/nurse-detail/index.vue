<template>
	<div class="main">
<!--		<head-bar title="护士详情">-->
<!--			<span slot="right" @click="selNurse">选此护士</span>-->
<!--		</head-bar>-->
		<div class="card">
			<img class="head-img" :src="nurseData.avatar" alt=" ">
			<div class="content">
				<p class="name">{{nurseData.name}}</p>
				<p class="tips">
					<img class="tip" src="/static/icon/nursetip.png" alt="">
					<img class="tip2" src="/static/icon/renzheng.png" alt="">
				</p>
				<p class="other">
					<span v-if="nurseData.workYears">{{nurseData.workYears + '年'}}{{nurseData.department}}</span>
					<span>{{nurseData.hospital}}</span>
				</p>
			</div>
			<div class="score">
				<van-rate readonly v-model="scoreValue" allow-half/>
				<span>{{scoreValue}} <em>分</em></span>
			</div>
		</div>
		<div class="detail">
			<div class="desc" >
				专长简介 <span>{{nurseData.speciality?nurseData.speciality:'暂无'}}</span>
			</div>
			<p class="tips">
				<img src="/static/img/nursedetail.png" alt="" style="height: 25px">
			</p>
		</div>
		<div class="evaluate">
			<p class="title">
				<span>服务评价</span>
				<span class="more" @click="openEvaList">查看全部 > </span>
			</p>
			<div class="item" v-if="evaluateData">
				<img class="user-img" :src="evaluateData.avatar" alt=" " v-if="evaluateData">
				<div style="flex: 1">
					<p class="name">{{evaluateData.name}}</p>
					<p class="eva-desc">
						{{evaluateData.userEvaluation}}
					</p>
				</div>
			</div>
			<div class="no-eval" v-else >
				暂无评价
			</div>
		</div>
	</div>
</template>

<script>
	// import headBar from '@/components/header/head-bar'
	// import {getNurDetail} from "@/lib/API/order";

	export default {
		// components:{
		// 	headBar,
		// },
		data(){
			return{
				evaluateList:[], //所有用户对护士评价列表
				evaluateData:{},
				nurseData:{},
				scoreValue:5
			}
		},
		beforeMount(){
			this.nurseId = this.$route.query.nurseId
      console.log(this.nurseId);
      this.getNurDetail({id:this.nurseId})
		},
		mounted(){
		},
		methods: {
			//护士详情
			async getNurDetail(params){
				await this.$fly.request({
					methods:'get',
					url:"orderList/nurseevaluate",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.nurseData =  res.data.nurse
						this.nurseName = res.data.nurse.name
						this.evaluateList =  res.data.evaluate
						this.evaluateData =  res.data.evaluate[0]
						this.scoreValue = this.nurseData.grade
					}}).catch((req)=>{
					console.log(req)
				})
			},
			openEvaList(){
				if(this.evaluateList.length===0){
					this.$toast('没有更多评价了')
				}else {
					// this.$router.push({name:'护士评价列表',params:{evaluateList:this.evaluateList}})
				}
			},
			selNurse(){
				localStorage.setItem('nurseId',this.nurseId)
				localStorage.setItem('nurseName',this.nurseName)
				setTimeout(()=>{
					this.$router.go(-2)
				},100)
			},
		}
	}
</script>

<style scoped>
	.card >>> .van-rate__icon{
		color: #FDA500!important;
	}
</style>
<style lang="less" scoped>
	.main{
		padding-top: 90px;
		.card{
			display: flex;
			align-items: center;
			height:232px;
			/*background: url('../../assets/img/nures-banner.png') no-repeat top;*/
			background-size:100%;
			background-color: #ffffff;
			padding: 25px 40px;
			position: relative;
			img{
				width:152px;
				height:152px;
				background:rgba(216,216,216,1);
				border-radius: 50%;
				overflow: hidden;
			}
			.content{
				flex: 1;
				text-align: left;
				margin-left: 36px;
				.name{
					font-size:32px;
					font-family:PingFangSC;
					font-weight:500;
					color:rgba(72,72,72,1);
					line-height:44px;
					margin: 20px 0 16px;
				}
				.tips{
					font-size:32px;
					font-family:PingFangSC;
					font-weight:500;
					color:rgba(72,72,72,1);
					display: flex;
					img{
						background:#fff;
						border-radius:0;
					}
					.tip{
						width:80px;
						height:36px;
						margin-right:16px;
					}
					.tip2{
						height:38px;
						width: auto;
					}
				}
				.other{
					font-size:26px;
					font-family:PingFangSC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:36px;
					margin-top: 12px;
					span{
						margin-right: 20px;
					}
				}
			}
			.score{
				position: absolute;
				right: 30px;
				top: 30px;
				font-size:36px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(253,165,0,1);
				>span{
					margin-left: 16px;
					em{
						font-size: 18px;
					}
				}
			}
		}
		.detail{
			background:rgba(255,255,255,1);
			text-align: left;
			padding: 32px 40px 20px;
			margin: 20px 0;
			>div{
				display: flex;
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(72,72,72,1);
				margin-bottom: 20px;
				span{
					flex: 1;
					font-size:26px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					margin-left: 40px;
				}
			}
			.tips{
				margin: 56px 0 40px;
				text-align: center;
				img{
					width: 90%;
				}
			}
		}
		.evaluate{
			padding: 32px 38px;
			background:rgba(255,255,255,1);
			text-align: left;
			.title{
				display: flex;
				justify-content: space-between;
				margin-bottom: 26px;
				span{
					font-size:28px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(72,72,72,1);
				}
				.more{
					font-size:22px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(71,189,195,1);
				}
			}
			.item{
				display: flex;
				align-items: center;
				img{
					width:54px;
					height:54px;
					margin-right: 16px;
					border-radius: 50%;
					background-color: #555;
					overflow: hidden;
				}
				.name{
					font-size:22px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:32px;
				}
				.eva-desc{
					font-size:22px;
					font-family:PingFangSC-Light,PingFang SC;
					font-weight:300;
					color:rgba(51,51,51,1);
					line-height:32px;
				}
			}
		}
		.no-eval{
			font-size: 24px;
			text-align: center;
			color:#999999;
		}
	}
</style>

