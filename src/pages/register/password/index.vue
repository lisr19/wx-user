<template>
	<div class="page">
		<img class="logo" src="../../../../static/icon/logo.png" alt="">
		<div class="card">
			<input v-model.lazy="userPhoneNum" placeholder='请输入手机号码' type="number" >
			<div class="code">
				<input  v-model.lazy="code" type="number" placeholder='输入验证码' style="padding-right: 80px">
				<span @click.stop="sendCode">{{codeText}}</span>
			</div>
			<input  v-model.lazy="userPassWord" placeholder='输入您的新密码' type="password">
			<input  v-model.lazy="userPassWord2" placeholder='请重复您的新密码' type="password">
			<div class="btn" @click="updataPass">修改密码，并立即登录</div>
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

		},
		methods:{
			showTip(){
				wx.showToast({title: '请先阅读《用户服务协议》并同意', icon: 'none'})
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
					password :this.userPassWord,
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
						wx.switchTab({url: '../../index/main'})
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
			async updataPass(){
				if(!this.userPhoneNum){
					wx.showToast({title: '请输入手机号', icon: 'none',})
					return
				}else if(!(/^1[3-9]\d{9}$/.test(this.userPhoneNum))){
					wx.showToast({title: '电话号码格式错误', icon: 'none',})
					return
				}else if(!this.code){
					wx.showToast({title: '请输入验证码', icon: 'none',})
					return
				}else if(!this.userPassWord){
					wx.showToast({title: '请输入密码', icon: 'none',})
					return
				}else if(this.userPassWord!==this.userPassWord2){
					wx.showToast({title: '两次密码不一致', icon: 'none',})
					return
				}else if(!(/^(\w){6,16}$/.test(this.userPassWord))){
					wx.showToast({title: '密码只能输入6-20个字母、数字、下划线', icon: 'none',})
					return
				}
				// else if(!this.isSend){
				// 	wx.showToast({title: '请获取验证码', icon: 'none',})
				// 	return
				// }
				let params = {
					username:this.userPhoneNum,
					password:this.userPassWord,
					code:this.code
				}
				await this.$fly.request({
					method:"post",
					url:"user/codeUpdatePwd",
					params
				}).then(res =>{
					if(res.code === 200) {
						wx.showToast({title: '密码修改成功',icon: 'none'})
						this.userLogin()
					}else {
						wx.showToast({title: '验证码错误', icon: 'none'})
					}
				}).catch((req)=>{
					console.log(req)
				})
			}
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
			width:670px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin: 0 auto;
			padding-bottom: 15px;
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
				font-size: 20px;
				margin-top: 14px;
				color: #999;
				display: flex;
				align-items: center;
				justify-content: center;
				span{
					color: #47BDC3;
				}
				.icon{
					width:26px;
					height:26px;
					border-radius: 50%;
					border: solid #d6d6d6 1px;
					display: inline-block;
					margin-right: 8px;
				}
				.icon-select{
					width:26px;
					height:26px;
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
				margin: 55px auto 10px;
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
	}

</style>
