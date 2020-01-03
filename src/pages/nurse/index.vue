<template>
	<div class="main">
		<div class="nurse-list">
			<ul>
				<li class="item" v-for="item in nuresList" :key="item.id">
					<img :src="item.avatar" alt="">
					<div class="content">
						<p class="name">{{item.name}}
							<img class="tip" v-if="item.gender===1" src="/static/icon/nursetip2.png" alt="">
							<img class="tip" v-else src="/static/icon/nursetip.png" alt="">
							<img class="tip2" src="/static/icon/renzheng.png" alt="">
						</p>
						<p class="desc"><span v-if="item.workYears">{{item.workYears + '年'}}</span>{{item.department}} <span style="margin-left: 0.2rem">{{item.hospital}}</span></p>
						<!--<span class="more" @click="openDetail(item)">查看详情 ></span>-->
					</div>
					<div class="btn" @click="selNurse(item)">选择</div>
				</li>
			</ul>
			<div class="no-nures" v-if="nuresList.length===0">
				<img  src="/static/icon/hushi.png" alt="">
				<p style="color:rgb(153, 153, 153)">该时间段暂无护士可供选择</p>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data(){
			return{
				nuresList:[],
				hospitalId:null
			}
		},
		beforeMount(){
			if(this.$route.query.hospitalId){
				this.hospitalId =  this.$route.query.hospitalId
			}
			this.getNurList()
		},
		mounted(){
		},
		methods: {
			//护士列表
			async getNurList(){
				let params ={
					serviceId:this.$route.query.serviceId,
					serviceTime:this.$route.query.serviceTime,
					serviceArea:this.$route.query.subordinateArea,
					size:200
				}
				if(this.hospitalId){
					params.hospitalId =  this.hospitalId
				}
				await this.$fly.request({
					methods:'get',
					url:"nurse/list",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.nuresList =res.data.list
					}})
			},
			selNurse(item){
				this.nurseId = item.id
				this.nurseName = item.name
				wx.setStorageSync('nurseId', this.nurseId);
				wx.setStorageSync('nurseName', this.nurseName);
				this.$router.back()
			},
			//查看详情
			openDetail(item){
				this.$router.push({path:'/pages/order-detail/main',query:{nurseId:item.id}})
			}
		}
	}
</script>

<style lang="less" scoped>
	.main{
		min-height: 100%;
		background: rgba(247,247,247,1);
		.nurse-list{
			padding-top: 22px;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			ul{
				width: 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				li{
					height:186px;
					/*width:710px;*/
					width: 95%;
					background:rgba(255,255,255,1);
					border-radius:20px;
					display: flex;
					margin-bottom: 20px;
					align-items: center;
					padding: 0 20px;
					.content{
						flex: 1;
						text-align: left;
						margin: 0 12px;
						.name{
							font-size:32px;
							font-family:PingFangSC;
							font-weight:500;
							color:rgba(72,72,72,1);
							display: flex;
							align-items: center;
							img{
								background:#fff;
								border-radius:0;
							}
							.tip{
								width:80px;
								height:36px;
								margin: 0 16px;
							}
							.tip2{
								height:44px;
							}
						}
						.desc{
							font-size:26px;
							font-family:PingFangSC;
							font-weight:400;
							color:rgba(153,153,153,1);
						}
						.more{
							font-size:24px;
							font-family:PingFangSC;
							font-weight:400;
							color:rgba(153,153,153,1);
						}
					}
					img{
						width:120px;
						height:120px;
						background:rgba(216,216,216,1);
						border-radius:10px;
					}
					.btn{
						width:80px;
						height:80px;
						line-height: 66px;
						background:rgba(52,170,220,1);
						border-radius: 50%;
						overflow: hidden;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size:26px;
						font-family:PingFangSC;
						font-weight:400;
						color:rgba(255,255,255,1);
					}
				}
			}
		}
		.no-nures{
			width: 100%;
			font-size: 30px;
			img{
				width: 66%;
			}
		}
	}
</style>

