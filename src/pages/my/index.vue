<template>
	<div class="main">
		<div class="banner">
			<img class="icon" src="/static/img/banner.png" alt="">
			<p>
		       <span @click="openMy">
		         <img class="head-img" v-if="avatar" :src="avatar" alt=" ">
			       <img class="head-img" v-else  src="/static/img/headimg.jpg" alt="">
		         <strong class="name">{{username}}</strong>
		       </span>
			</p>
		</div>
		<div class="card">
			<div class="items">
				<div class="item" v-for="item in typeList" :key="index"  @click="openCategory(item.name)">
					<div style="height: 40px;display: flex;align-items: center;justify-content: center">
						<img :src="item.iconUrl" alt="">
					</div>
					<span class="name">{{item.name}}</span>
				</div>
			</div>
		</div>
		<div class="about-hotel">
			<div class="item" v-for="item in tipList" :key="index" @click="openDetail(item)">
				{{item.title}}
			</div>
      <div class="item">{{edition}}</div>
		</div>
		<div class="btn" @click="showTip">解除手机绑定</div>
		<van-popup :show="showPassword">
			<div class="change-box">
				<input v-model.lazy="newPassword" placeholder='新密码' type="password">
				<input v-model.lazy="repetPassword" placeholder='重复密码' type="password">
				<div class="btn2" @click="cancle" style="background-color: #969696">取消</div>
				<div class="btn2" @click="updatePass">修改密码</div>
			</div>
		</van-popup>

    <van-popup :show="showQrcode" @close="onClose">
      <div class="change-box change-box2">
        <img class="qr-code" :src="Qrcode" alt=" ">
      </div>
    </van-popup>
    <van-popup  :show="showPhone">
      <div class="valid-box">
        <div class="tip">
          <p>就诊病人及家属请仔细阅读</p>
          <span @click="openUserProt">《用户服务协议及隐私保护政策》</span><br>
          绑定手机号码并点击确定代表您完全同意本协议的全部内容。</div>
        <input v-model.lazy="phone"  type="number" placeholder='绑定手机号码'>
        <div style="display:flex;">
          <span style="background-color: #f1f1f1;color: #000" class="btn2" @click="showPhone=false">取消</span>
          <span class="btn2" @click="newUserValid">确定</span>
        </div>
      </div>
    </van-popup>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        phone:'',
        showPhone:false,
        edition:'当前版本：3.3.0',
        Qrcode:null,
        showQrcode:false,
				showPassword:false, //修改密码弹窗
				newPassword:null,
				repetPassword:null,
				versionCode:'', //版本号
				avatar: require('../../../static/img/headimg.jpg'),//头像
				username: '未登录',
				typeList: [
					{
						name: '健康档案',
						iconUrl: require('../../../static/icon/coupon.png'),
					},
					{
						name: '评价',
						iconUrl: require('../../../static/icon/evaluate.png'),
					},
					{
						name: '收藏',
						iconUrl: require('../../../static/icon/collect.png'),

					},
				],
				tipList: [
          {
            title: '门诊健康码'
          },
          {
            title: '入院健康码'
          },
          {
            title: '我的上报'
          },
					// {
					// 	title: '修改密码'
					// },
					// {
					// 	title: '意见反馈'
					// }
				],
			}
		},
		beforeMount() {
		},
    onShow(){
      this.userId = wx.getStorageSync('userId')
      this.openId = wx.getStorageSync('openId')
      if(this.userId){
        this.getUserDate({userId:this.userId})
        this.getQrcode()
      }else {
        wx.showModal({
          title:'提示',
          content: '请先绑定手机号码',
          success (res) {
            if (res.confirm) {
              wx.switchTab({url: '../index/main'})
            } else if (res.cancel) {
              wx.switchTab({url: '../index/main'})
              console.log('用户点击取消')
            }
          }
        })
      }
    },
		methods: {
      openUserProt(){
        wx.navigateTo({url:'../register/user-prot/main',query:{from:'index'}})
      },
      async newUserValid() {
        console.log('点击了确定');
        if(!this.phone){
          this.$toast('请输入手机号码')
          return
        }else {
          if(!(/^1[3-9]\d{9}$/.test(this.phone))){
            wx.showToast({
              title: '电话号码格式错误',
              icon: 'none',
            })
            return
          }
        }
        let that = this
        wx.showModal({
          title:'确认提示',
          content: '请再次确认您的手机号码',
          success (res) {
            if (res.confirm) {
              let params ={
                openId:that.openId,
                phone:that.phone
              }
              console.log(params);
              that.$fly.request({
                method:'post',
                url:"user/valid",
                params
              }).then(res =>{
                if(res.code === 200) {
                  that.userInfo = res.data.userInfo
                  let token = res.data.token
                  wx.setStorageSync('token',token);
                  wx.setStorageSync('userInfo', that.userInfo);
                  wx.setStorageSync('userId', that.userInfo.id);
                  wx.setStorageSync('phone', that.userInfo.username);
                  that.showPhone =false
                  setTimeout(()=>{
                    that.$toast('手机号已绑定成功')
                  },500)
                }else {
                  that.$toast(res.message)
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      onClose(){
        this.showQrcode =false
      },
      async getUserDate(params) {
        await this.$fly.request({
          methods:'fetch',
          url:"user/findById",
          params
        }).then(res =>{
          if(res.code === 200) {
            this.myData = res.data
            this.username = this.myData.username
            if(res.data.avatar){
              this.avatar = this.myData.avatar
              if(this.avatar==="undefined"){
                this.avatar=require('../../../static/img/headimg.jpg')
              }
            }
            console.log(this.myData);
          }else if(res.message==='请先登录') {
            let that = this
            wx.showModal({
              title:'提示',
              content: '请重新登录',
              success (res) {
                if (res.confirm) {
                  // that.showPhone =true
                  wx.switchTab({url: '../index/main'})
                } else if (res.cancel) {
                  // that.showPhone =true
                  wx.switchTab({url: '../index/main'})
                  console.log('用户点击取消')
                }
              }
            })
          }}).catch((req)=>{
          console.log(req)
        })
      },
			async getQrcode() {
        let params = {
          userId:this.userId,
          size:5
        }
				await this.$fly.request({
					methods:'get',
					url:"ncpQr/list",
					params
				}).then(res =>{
					if(res.code === 200) {
					  if(res.data.list.length>0){
              this.Qrcode = res.data.list[0].ncpQr
            }else {
              this.Qrcode=null
            }
					}}).catch((req)=>{
						console.log(req)
				})
			},

			openMy() {
				this.$router.push({path: '/pages/my/infor/main'})
			},
			openCategory(params) {
				if (params === '健康档案') {
					this.$router.push({path:'/pages/phr/main'})
				} else if (params === '评价') {
					this.$router.push({path: '/pages/my/evaluate/main'})
				} else {
					wx.showToast({title: '功能尚未开通，敬请期待', icon: 'none'});
				}
			},
			openDetail(item){
        console.log(this.Qrcode);
				if(item.title==='修改密码'){
					this.newPassword = null
					this.repetPassword = null
					this.showPassword = true
				}else if(item.title==='我的上报'){
          this.$router.push({path: '/pages/question/qlist/main'})
        } else if(item.title==='门诊健康码'){
				  if(this.Qrcode===null){
            this.$toast('您尚未填写预检登记表')
          }else {
            this.$router.push({path: '/pages/qrcode/main'})
          }
        }else if(item.title==='入院健康码'){
          this.$router.push({path: '/pages/qrcode2/main'})
        } else {
					wx.showToast({title: '功能尚未开通，敬请期待', icon: 'none'})
				}
			},

			cancle(){
				this.showPassword = false
			},
			async updatePass(){
        if(this.newPassword===null||this.newPassword===''){
					this.$toast('请输入新密码')
					return
				}else if(this.repetPassword===null||this.repetPassword===''){
					this.$toast('请重复输入新密码')
					return
				}else if(this.newPassword!==this.repetPassword){
					this.$toast('两次密码不一致')
					return
				} else if(!(/^(\w){6,16}$/.test(this.newPassword))){
					this.$toast('密码只能为字母、数字、或下划线组成的6-16位数')
					return
				}
				let params={
          id:this.userId,
          password:this.newPassword
        }
        await this.$fly.request({
          method:'put',
          url:"user/update",
          params
        }).then(res =>{
          if(res.code === 200) {
            this.showPassword = false
            this.$toast('修改密码成功')
          }else {
            this.$toast('修改密码失败')
          }
        }).catch((req)=>{
          console.log(req)
        })

			},
			showTip(){
        let that =this
        wx.showModal({
          title:'提示',
          content: '您确定解除该手机号的绑定吗？',
          success (res) {
            if (res.confirm) {
              let params ={
                openId:wx.getStorageSync('openId'),
              }
              that.$fly.request({
                method:'post',
                url:"user/unbindWx",
                params
              }).then(res =>{
                if(res.code === 200) {
                  wx.clearStorage()
                  wx.clearStorageSync()
                  that.$toast('解除绑定成功')
                  wx.switchTab({ url: '../index/main' });
                }else {
                  that.$toast(res.message)
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
			},
      quitUser(){
        wx.showModal({
          title:'提示',
          content: '您确定退出账户吗',
          success (res) {
            if (res.confirm) {
              wx.clearStorage()
              wx.clearStorageSync()
              wx.reLaunch({url: '../login/main'})
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
		}
	}
</script>


<style scoped>
	.main>>>.van-popup--center{
		border-radius: 10px;
		overflow: hidden;
	}
</style>
<style lang="less" scoped>
	.main {
		background-color: #f8f9fb;
		height: 100%;
		position: relative;
		.banner {
			height: 340px;
			position: relative;
			overflow: hidden;
			background:linear-gradient(132deg,rgba(48,206,211,1) 0%,rgba(71,189,195,1) 100%);
			> img {
				display: block;
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: 1;
			}
			p {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 50px 40px;
				z-index: 2;
				span {
					display: flex;
					align-items: center;
				}
				.head-img {
					border-radius: 50%;
					margin-right: 24px;
					width: 108px;
					height: 108px;
					z-index: 2;
					background-color: #f1f1f1;
					overflow: hidden;
				}
				.name {
					height: 44px;
					font-size: 32px;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					line-height: 44px;
					text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.27);
					z-index: 2;
				}
				.icon {
					display: block;
					height: 34px;
					width: 36px;
					margin-left: 28px;
					z-index: 2;
				}
			}
		}
		.card {
			/*width: 670px;*/
			width: 90%;
			height: 218px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.04);
			border-radius: 20px;
			margin: 0 auto;
			position: absolute;
			left: 5%;
			top: 256px;
			z-index: 2;
			.items {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 32px;
				height: 100%;
				.item {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					img {
						max-width: 60px;
						height: 60px;
						display: inline-block;
					}
					.name {
						height: 36px;
						font-size: 26px;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						line-height: 36px;
						margin-top: 20px;
					}
				}
			}
		}
		.about-hotel {
			/*width: 670px;*/
			width: 90%;
			padding: 40px 0;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.04);
			border-radius: 20px;
			margin: 180px auto 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.item {
				height: 78px;
				line-height: 78px;
				font-size: 26px;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				text-align: left;
				padding: 0 32px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.edition {
					height: 36px;
					font-size: 20px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					line-height: 36px;
					display: flex;
					align-items: center;
				}
			}
		}
		.btn{
			width: 90%;
			height:90px;
			line-height: 90px;
			background:rgba(255,255,255,1);
			border-radius:20px;
			border: none;
			font-size:26px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:#47BDC3;
			margin: 50px auto 0;
			text-align: center;
		}
		.layout {
			background: rgba(0, 0, 0, 0.26);
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 9;
			display: flex;
			justify-content: center;
			align-items: center;
			.content {
				width: 558px;
				height: 714px;
				background: rgba(255, 255, 255, 1);
				border-radius: 30px;
				overflow: hidden;
				text-align: center;
				.bg {
					width: 558px;
					height: 322px;
					img {
						width: 100%;
					}
				}
				h1 {
					height: 44px;
					font-size: 32px;
					font-family: PingFangSC-Semibold;
					font-weight: 600;
					color: rgba(72, 72, 72, 1);
					line-height: 44px;
					padding-left: 52px;
					margin: 18px 0 34px;
					text-align: left;
				}
				ul {
					padding-left: 52px;
					text-align: left;
					li {
						height: 36px;
						font-size: 26px;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						line-height: 36px;
						margin-bottom: 16px;
						position: relative;
						.spot {
							width: 10px;
							height: 10px;
							background: rgba(0, 194, 254, 1);
							position: absolute;
							left: -24px;
							top: 14px;
							border-radius: 50%;
						}
					}
				}
				.apply-now {
					width: 458px;
					height: 76px;
					background: linear-gradient(180deg, rgba(0, 199, 254, 1) 0%, rgba(98, 140, 253, 1) 100%);
					border-radius: 42px;
					font-size: 32px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 44px;
					border: none;
					margin: 34px auto 0;
				}
			}
		}
		.updated-version{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(51,51,51,0.4);
			z-index: 100;
			.updated{
				width:670px;
				height:656px;
				background:rgba(255,255,255,1);
				border-radius:16px;
				position: absolute;
				top: 270px;
				left: 50%;
				margin-left: -335px;
				overflow: hidden;
				.now-version{
					position: absolute;
					right: 15px;
					bottom: 90px;
					z-index: 99;
					color: #c7c7c7;
					font-size: 16px;
				}
				img{
					width: 100%;
					height: auto;
				}
				.btn{
					width: 335px;
					height: 88px;
					border: 1px solid #DFDFDF;
					font-size:32px;
					font-family:PingFangSC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:88px;
					position: absolute;
					bottom: 0;
					right: 0;
					border-radius: 0;
				}
				>.btn:nth-of-type(1){
					right: 50%;
					font-weight:600;
					color:rgba(71,189,195,1);
				}
			}
		}
		.change-box{
			width: 650px;
			height: 516px;
			padding: 20px 0 40px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			input{
				width: 80%;
				height: 58px;
				outline: none;
				display: block;
				border: 0;
				border-bottom: 2px solid #C7C7C7;
				background: #fff;
				font-size: 24px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				line-height: 58px;
				margin-top: 26px;
			}
			.btn2{
				width: 80%;
				height:72px;
				line-height: 72px;
				margin-top: 50px;
				background:#47BDC3;
				border-radius:10px;
				border: none;
				font-size:26px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:#ffffff;
        text-align: center;
			}
		}
    .change-box2{
      width: 516px;
      height: 516px;
      padding:0;
    }
    .qr-code{
      width: 100%;
      height: 100%;
      background-color: #47BDC3;
    }
    .valid-box{
      width:650px;
      /*height: 500px;*/
      background:rgba(255,255,255,1);
      border-radius:10px;
      color: #333;
      font-size: 38px;
      overflow: hidden;
      .tip{
        padding: 25px 40px;
        /*height: 170px;*/
        box-sizing: border-box;
        line-height: 60px;
        p{
          padding-left: 25px;
          font-size: 38px;
        }
        span{
          color: #47BDC3;
        }
      }
      input{
        height: 120px;
        line-height: 120px;
        padding-left: 30px;
        width:100%;
        border: 1px solid #C7C7C7;
        background: #fff ;
        font-size:38px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        border-radius: 8px;
        overflow: hidden;
        color: #000000;
      }
      .btn2{
        text-align: center;
        border:none;
        width: 100%;
        height:110px;
        line-height: 110px;
        background:#47BDC3;
        outline: none;
        font-size:38px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
    }
	}
</style>
