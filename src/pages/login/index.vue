<template>
	<div class="page">
		<img class="logo" src="../../../static/icon/logo.png" alt="">
		<div class="login-box" id="login-box">
			<input v-model.lazy="userPhoneNum"  type="number" placeholder='请输入手机号码'>
			<div class="pass-box">
				<input  v-model.lazy="userPassWord" v-if="showPass" type="text" placeholder='请输入密码'>
				<input  v-model.lazy="userPassWord" v-else type="password" placeholder='请输入密码'>
				<div class="tip" @click="onClickPassShow">
					<img v-if="showPass" src="../../../static/icon/hide-pass.png" alt="">
					<img v-else src="../../../static/icon/show-pass.png" alt="">
				</div>
			</div>
			<div class="btn" @click="userLogin()">登录</div>
			<div class="btn-box">
				<span class="forget-pass" @click="openForget">忘记密码？</span>
				<span class="new-enroll" @click="openRe">注册账号</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				showPass: false,
				//登录的 账号 密码
				userPhoneNum: '',
				userPassWord: '',
				//新账号的 账号 验证码 密码
				newUserPhoneNum:'',
				newUserverification:'',
				newUserPassWord:'',
				newUserPassWord2:'',
				//忘记密码的 账号 验证码 新密码
				userPhone:'',
				userVerification:'',
				userNewPass:'',
				userNewPass2:'',
				loginButton:[],
				enrollButton:[],
				forgetButton:[],
				loginBox:[],
				enrollBox:[],
				forgetBox:[],
				isLogin:true,
				reg:null,
				getCode1:false,
			}
		},
		beforeMount(){

		},
		methods:{
			// 用户登录
			async userLogin(){
				if(!this.userPhoneNum){
					wx.showToast({
						title: '请输入手机号',
						icon: 'none',
					})
					return
				}
				if(!this.userPassWord){
					wx.showToast({
						title: '请输入密码',
						icon: 'none',
					})
					return
				}
				if(!(/^1[3-9]\d{9}$/.test(this.userPhoneNum))){
					wx.showToast({
						title: '电话号码格式错误',
						icon: 'none',
					})
					return
				}
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
					this.$toast(req)
				})
			},
			openRe(){
				this.$router.push({path:'/pages/register/main'})
			},
			openForget(){
				this.$router.push({path:'/pages/register/password/main'})
			},
			// 登录密码显示隐藏
			onClickPassShow(){
				if(this.showPass){
					this.showPass = false;
				}else{
					this.showPass = true;
				}
			},
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
		.login-box{
			width:670px;
			height:512px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin: 0 auto;
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
			}
			.btn{
				margin: 64px auto 0;
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
			.btn-box{
				margin-top: 64px;
				text-align: right;
				height:34px;
				font-size:24px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:34px;
				padding-right: 60px;
				span{
					margin-right: 24px;
				}
			}
		}
	}
</style>
