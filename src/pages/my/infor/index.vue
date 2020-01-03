<template>
	<div class="main">
		<div class="content">
			<div class="h-img" @click="showTip">头像
				<div class="head-box">
					<Upload
							ref="upload"
							:show-upload-list="false"
							:on-success="handleSuccess"
							:format="['jpg','jpeg','png']"
							:max-size="20480"
							:on-format-error="handleFormatError"
							:on-exceeded-size="handleMaxSize"
							type="drag"
							name="imgFile"
							:headers="myHeader"
							:action="imgBaseUrl"
							style="display: inline-block;">
						<img class="img-head" v-if="avatar" :src="avatar" alt=" ">
						<img class="img-head" v-else  src="/static/img/headimg.jpg" alt="">
					</Upload>
					<Icon type="ios-arrow-forward"/>
				</div>
			</div>

			<van-cell-group>
				<van-field
						size="large"
						label="姓名"
						v-model="name"
						placeholder="请输入姓名"
						@change="changeName"
				/>
				<van-cell title="性别" :value="gender" size="large" @click="showSex"/>
				<van-field
						size="large"
						label="联系电话"
						v-model="username"
						placeholder="请输入联系电话"
						@change="changePhone"
						:error-message='errorPhone'
				/>
				<van-field
						size="large"
						label="邮件"
						v-model="email"
						placeholder="请输入邮件"
						:error-message='errorEmail'
						@change="changeEmail"
				/>
				<van-field
						size="large"
						label="身份证号"
						v-model="idNumber"
						placeholder="请输入身份证号"
						:error-message='errorIdNumber'
						@change="changeIdNumber"
				/>
			</van-cell-group>
			<div class="btn" @click="save">保存</div>
		</div>
		<!--选择性别弹窗-->
		<van-popup :show="showSexBox">
			<div class="box-wrap">
				<p>性别</p>
				<van-radio-group :value="gender" @change="onChange">
					<van-cell-group>
						<van-cell title="男" data-name="男"  clickable @click="onClick">
							<van-radio slot="right-icon" name="男" />
						</van-cell>
						<van-cell title="女" data-name="女"  clickable  @click="onClick">
							<van-radio slot="right-icon" name="女" />
						</van-cell>
					</van-cell-group>
				</van-radio-group>
			</div>
		</van-popup>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				errorPhone:'',
				errorEmail:'',
				errorIdNumber:'',
				radio: '1',
				show:false,
				// myHeader: { authorization: localStorage.getItem('token') },
				reg:null,
				myData:{},//我的个人信息
				imgUrl:{},
				avatar:'',
				username:null, //用户名
				name:null, //姓名
				birthYear:null,
				birthMonth:null,
				birthDay:null,
				phone:null, //电话
				email:null,//邮件
				idNumber:null,//身份证
				isEdit:false,
				showSexBox:false,//性别选择弹窗
				emeContact:null,
				imgName: '',
				visible: false,
				uploadList: [],
				gender:1, //性别Value
			}
		},
		beforeMount() {
			this.userId = wx.getStorageSync('userId')
			this.getUserDate({userId:this.userId})
		},
		mounted () {
			// this.uploadList = this.$refs.upload.fileList;
		},
		methods: {
			onChange(event) {
				this.gender =event.mp.detail
				this.showSexBox =false
			},
			onClick(event) {
				const { name } = event.currentTarget.dataset
				this.gender =name
				this.showSexBox =false
			},
			changeName (event) {
				this.name = event.mp.detail
			},
			changePhone (event) {
				this.username = event.mp.detail
				let reg = /^1[0-9]{10}$/
				if (!reg.test(this.username)) {
					this.errorPhone='请输入正确电话号码'
				}else {
					this.errorPhone=''
				}
			},
			changeEmail (event) {
				this.email = event.mp.detail
				let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
				if (!reg.test(this.email)) {
					this.errorEmail='请输入正确邮箱'
				}else {
					this.errorEmail=''
				}
			},
			changeIdNumber (event) {
				this.idNumber = event.mp.detail
				let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
				if (!reg.test(this.idNumber)) {
					this.errorIdNumber='请输入正确的身份证号'
				}else {
					this.errorIdNumber=''
				}
			},
			changeName (event) {
				this.name = event.mp.detail
			},
			//性别选择弹窗
			showSex(){
				this.showSexBox = true
			},
			showTip(){
				wx.showToast({title: '暂不支持修改头像，请前往APP中修改',icon: 'none'})
			},
			confirmFn() { // 确定按钮
				setTimeout(()=>{
					console.log(this.formatDate(this.currentDate))
					this.show = false
				},100)
			},
			cancelFn(){
				this.show = false;
			},
			//获取个人信息
			async getUserDate(params) {
				await this.$fly.request({
					method:'get',
					url:"user/findById",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.myData = res.data
						this.name = this.myData.name
						this.username = this.myData.username?this.myData.username:'u'+this.myData.phone
						this.email = this.myData.email
						this.phone = this.myData.phone
						this.idNumber = this.myData.idNumber
						this.birthYear = this.myData.birthYear
						this.birthMonth=this.myData.birthMonth
						this.birthDay=this.myData.birthDay
						this.avatar = this.myData.avatar
						if(this.myData.gender===1){
							this.gender = '男'
						}else {
							this.gender = '女'
						}
					}
				})
			},
			//编辑个人信息
			async userUptate(params){
				await this.$fly.request({
					method:'put',
					url:"user/update",
					params
				}).then(res =>{
					if(res.code === 200) {
						wx.showToast({title: '修改成功'})
						setTimeout(()=>{
							this.$router.back()
						},300)
					}else {
					wx.showToast({title: '修改失败', icon: 'none'})
				}})
			},
			//信息提交保存
			save(){
				let params ={
					id:this.userId,
					gender:this.gender==='男'?1:2,
					name:this.name,
					avatar:this.avatar
				}
				if(this.username){
					let reg = /^1[0-9]{10}$/
					if (!reg.test(this.username)) {
						wx.showToast({title: "请输入正确电话号码", icon: 'none',})
						return
					}
					params.username = this.username
				}
				if(this.email){
					let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
					if (!reg.test(this.email)) {
						wx.showToast({title: "请输入正确邮箱", icon: 'none',})
						return
					}
					params.email = this.email
				}
				if(this.idNumber){
					let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
					if (!reg.test(this.idNumber)) {
						wx.showToast({title: "请输入正确的身份证号码", icon: 'none',})
					}
					params.idNumber = this.idNumber
				}
				if(this.name===undefined||this.name===''){
					wx.showToast({title: '请填写姓名', icon: 'none'})
					return
				}
				console.log(params);
				this.userUptate(params)
			},
			handleSuccess (res, file) {
				file.url = res.data.url
				file.name = '头像'
				this.avatar = res.data.url
			},
			handleFormatError (file) {
				this.$toast('上传的图片格式不对，只支持jpg,jpeg,png')
			},
			handleMaxSize (file) {
				this.$toast('上传的图片最大不能超过2MB')
			},
		}
	}
</script>

<style>
	.van-field__input{
		color: #999999!important;
		text-align: right!important;
	}
	.van-field__error-message{
		text-align: right!important;
	}
</style>
<style lang="less" scoped>
	.main {
		background:rgba(241,241,241,1);
		padding:20px 0 54px;
		min-height: 100%;
		.head-box{
			display: flex;
			align-items: center;
			color: #999999;
			img{
				width:84px;
				height:84px;
				border-radius: 50%;
				display: block;
			}
			.name{
				height:50px;
				font-size:36px;
				font-family:PingFangSC-Medium;
				font-weight:500;
				color:rgba(72,72,72,1);
				line-height:50px;
				margin: 30px 0 12px;
				text-align: center;
				border: none;
				background-color: #F1F1F1FF;
			}
			.edit-name{
				height:40px;
				font-size:28px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(98,140,253,1);
				line-height:40px;
			}
		}
		.content{
			.title{
				height:42px;
				font-size:30px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(72,72,72,1);
				line-height:42px;

			}
			.items.card{
				margin: 20px 0;
			}
			.items{
				background:rgba(255,255,255,1);
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(51,51,51,1);
				margin: 0 auto;
				padding: 0 32px;
				.item{
					font-size:28px;
					height: 96px;
					line-height:96px;
					border-bottom: solid #D4D4D4 1px;
					text-align: left;
					display: flex;
					justify-content: space-between;
					align-items: center;
					span{
						display: flex;
						align-items: center;
					}
					span:last-child{
						font-size:28px;
						font-family:PingFangSC-Regular;
						font-weight:400;
						color:rgba(153,153,153,1);
						line-height:36px;
					}
				}
				.item.h-img{
					height: 134px;
					line-height: 134px;
				}
				.item:last-child{
					border-bottom:none;
				}
			}
			.business{
				width:670px;
				background:rgba(255,255,255,1);
				box-shadow:0px 10px 16px 0px rgba(0,0,0,0.04);
				border-radius:20px;
				margin: 0 auto;
				p:first-child{
					font-size:28px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:84px;
					height: 84px;
					border-bottom: solid #D4D4D4FF 1px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 32px;
					span:last-child{
						font-weight:400;
						color:rgba(153,153,153,1);
					}
				}
				p:last-child{
					font-size:24px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:80px;
					height: 80px;
					text-align: left;
					padding: 0 32px;
				}
			}
			.btn{
				width: 100%;
				height:82px;
				line-height: 80px;
				background:rgba(255,255,255,1);
				font-size:32px;
				font-family:PingFangSC;
				font-weight:500;
				color:rgba(71,189,195,1);
				border: none;
				margin-top: 250px;
				text-align: center;
			}
		}
		.box-wrap{
			width:668px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			overflow: hidden;
			text-align: center;
			p{
				height: 80px;
				line-height: 80px;
				font-size: 30px;
				font-weight: 600;
			}
			.btns{
				margin: 20px 0;
				display: flex;
				justify-content: space-between;
				button{
					margin: 0 30px;
				}
			}
		}
		.h-img{
			height: 134px;
			line-height: 134px;
			display: flex;
			font-size:29px;
			border-bottom: solid #D4D4D4 0.5px;
			text-align: left;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			padding: 0 28px;
		}
		.img-head{
			width:248px;
			height:248px;
			border-radius: 50%;
			display: block;
		}
	}
</style>
