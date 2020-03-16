<template>
	<div class="page">
		<img class="logo" src="../../../static/icon/logo.png" alt="">
		<div class="card">
			<input v-model.lazy="userPhoneNum" placeholder='请输入手机号码' type="number" >
			<div class="code">
				<input  v-model.lazy="code" type="number" placeholder='输入验证码' style="padding-right: 80px">
				<span @click.stop="sendCode">{{codeText}}</span>
			</div>
      <p class="tip2">
        <span style="display: flex;align-items: center;justify-content: flex-end"> <van-icon name="warning-o" size="20px" />新注册默认密码:123456</span><br>
        登录后请到'我的'修改密码</p>
<!--			<input  v-model.lazy="userPassWord" placeholder='请设置您的密码' type="password">-->
<!--			<input  v-model.lazy="userPassWord2" placeholder='请重复您的密码' type="password">-->
			<div class="btn" @click="registerUser">注册并登陆</div>
			<div class="tip"  @click="openUserProt">
				<em class="icon" v-if="!isRead"></em>
				<img class="icon-select" v-else src="../../../static/icon/yes.png" alt="">
				我已阅读且同意<span>《用户服务协议》</span></div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				isRead:false, //是否阅读用户协议
				showPass: false,
				//新账号的 账号 验证码 密码
				userPhoneNum:'',
				userPassWord:'',
				userPassWord2:'',
				codeText:'获取验证码',
				lock:true,
				isLogin:true,
				code:'', // 验证码
				isSend:false,
			}
		},
		beforeMount(){
			this.isRead = 	wx.getStorageSync('isRead')?wx.getStorageSync('isRead'):false
		},
		methods:{
			showTip(){
				wx.showToast({title: '请先阅读《用户服务协议》并同意', icon: 'none'})
			},
			//注册
			async registerUser(){
				if(!this.userPhoneNum){
					wx.showToast({title: '请输入手机号', icon: 'none',})
					return
				}else if(!this.code){
					wx.showToast({title: '请输入验证码', icon: 'none',})
					return
				}
				// else if(!this.userPassWord){
				// 	wx.showToast({title: '请输入密码', icon: 'none',})
				// 	return
				// }
				else if(!(/^1[3-9]\d{9}$/.test(this.userPhoneNum))){
					wx.showToast({title: '电话号码格式错误', icon: 'none',})
					return
				} else if(!this.isSend){
					wx.showToast({title: '请获取验证码', icon: 'none',})
					return
				} else if(!this.isRead){
					wx.showToast({title: '您尚未阅读并同意用户协议', icon: 'none',})
					return
				}
				if(this.userPassWord){
          if(!(/^(\w){6,16}$/.test(this.userPassWord))){
            wx.showToast({title: '密码只能输入6-20个字母、数字、下划线', icon: 'none',})
            return
          } else if(this.userPassWord!==this.userPassWord2){
            wx.showToast({title: '两次密码不一致', icon: 'none',})
            return
          }
        }else {
          // this.userPassWord='123456'
        }
				let params = {
					username:this.userPhoneNum,
          password :this.userPassWord?this.userPassWord:'123456',
					code:this.code
				}
				await this.$fly.request({
					method:"post",
					url:"user/codeRegister",
					params
				}).then(res =>{
					if(res.code === 200) {
						setTimeout(()=>{
							this.userLogin()
						},300)
					}else if(res.code === 400){
						wx.showToast({title: res.message, icon: 'none',})
					}else {
						wx.showToast({title: '验证码错误', icon: 'none',})
					}
				}).catch((req)=>{
					console.log(req)
				})
			},
			//获取验证码
			async sendCode(){
				if(this.lock){
					if(!this.userPhoneNum){
						wx.showToast({title: '请输入手机号', icon: 'none',})
						return
					}else if(!(/^1[3-9]\d{9}$/.test(this.userPhoneNum))){
						wx.showToast({title: '电话号码格式错误', icon: 'none',})
						return
					}
					let params = {
						phone :this.userPhoneNum,
					}
					this.isSend = false
					this.$fly.request({
						method:"post",
						url:"user/sendCode",
						params
					}).then(res =>{
						if(res.code === 200) {
							wx.showToast({title: '验证码已发送', icon: 'none',})
							this.isSend = true
							this.lock = false
							let second = 60
							let countDown = setInterval(()=>{
								this.codeText = second+'S'
								second--
								if(second == 0){
									clearInterval(countDown)
									this.lock = true
									this.codeText = '重新发送'
								}
							},1000)
							setTimeout(()=>{
								this.isSend = false
							},1000*60*5)
						}else {
							wx.showToast({title: '发送失败', icon: 'none',})
						}
					}).catch((req)=>{
						console.log(req)
					})
				} else{
					wx.showToast({title: '请勿多次点击', icon: 'none',})
				}
			},
			// 用户登录
			async userLogin(){
				let params = {
					username:this.userPhoneNum,
					password :this.userPassWord?this.userPassWord:'123456',
				}
				await this.$fly.request({
					method:"post",
					url:"user/login",
					params
				}).then(res =>{
					console.log(res);
					if(res.code === 200) {
						wx.showToast({title: '登录成功', icon: 'none',})
						let data = res.data
						let userId = data.userInfo.id
						let token = data.token
						let username = data.userInfo.username
						wx.setStorageSync('token',token);
						wx.setStorageSync('userId',userId);
						wx.setStorageSync('username',username)
						wx.switchTab({url: '../index/main'})
						// this.$router.push({name:'首页',params:{isLogin:true}})
					}else if(res.message==='帐户被禁用，请与管理员联系！'){
						wx.showToast({title: '帐户被禁用，请与管理员联系！', icon: 'none',})
					}else if(res.message==='密码错误'){
						wx.showToast({title: '密码错误', icon: 'none',})
					} else if(res.message==='此用户不存在'){
						wx.showToast({title: '此用户不存在', icon: 'none',})
					}else {
						wx.showToast({title: '输入的账号或密码有误，请重新输入',icon: 'none'});
					}
				}).catch((req)=>{
					console.log(req)
				})
			},
			openUserProt(){
				wx.navigateTo({url:'../register/user-prot/main',query:{from:'login'}})
			},
		}
	}
</script>
<style>
	page{
		color: #2c3e50;
		background:rgba(247,247,247,1);
	}
</style>
<style lang="less" scoped>
	.page{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: center;
		.logo{
			width: 142px;
			height: 142px;
			margin: 80px auto 50px;
		}
		.card{
			width:690px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin: 0 auto;
			padding-bottom: 35px;
			.code{
				position: relative;
				span{
					position: absolute;
					right: 50px;
					bottom: 25px;
					padding: 0 10px;
					min-width: 130px;
					height: 50px;
					font-size:24px;
					line-height: 50px;
					border-radius: 10px;
					color: rgba(150,150,150,1);
					font-weight: 500;
					border: 2px solid rgba(150,150,150,1);
					text-align: center;
				}
			}
			.tip{
				width: 100%;
				bottom: 10px;
				left: 0;
				height: auto;
				font-size: 32px;
				margin-top: 14px;
				color: #999;
				display: flex;
				align-items: center;
				justify-content: center;
				span{
					color: #47BDC3;
				}
				.icon{
          width:32px;
          height:32px;
					border-radius: 50%;
					border: solid #d6d6d6 1px;
					display: inline-block;
					margin-right: 8px;
				}
				.icon-select{
					width:32px;
					height:32px;
					color: #628CFD;
					display: inline-block;
					margin-right: 8px;
				}
			}
			input{
				padding-left: 15px;
				width: 80%;
				height: 62px;
				outline: none;
				display: block;
				border: 0;
				border-bottom: 2px solid #C7C7C7;
				background: #fff ;
				margin: 38px auto 0;
				font-size:24px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				line-height:62px;
				box-sizing: border-box;
			}
			.btn{
				margin: 40px auto 20px;
				text-align: center;
				border:none;
				width: 80%;
				height:72px;
				background:#47BDC3;
				box-shadow:0px 4px 8px 4px rgba(80,113,203,0.12);
				border-radius:10px;
				outline: none;
				font-size:28px;
				font-family:PingFangSC-Medium;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:72px;
			}
			.pass-box{
				position: relative;
				.tip{
					position: absolute;
					right: 45px;
					bottom: 8px;
					width: 50px;
					height: 40px;
					z-index: 9;
					img{
						display: block;
						width: 40px;
						height: 26px;
					}
				}
			}
		}
    .tip2{
      text-align: right;
      font-size:34px;
      font-weight: 600;
      font-family:PingFangSC-Regular;
      color: #FF1706;
      line-height:50px;
      padding-right:50px;
      margin-top: 30px;
    }
	}

</style>
