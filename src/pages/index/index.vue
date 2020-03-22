<template>
	<div class="nursing">
    <div  @click="anQue">
      <p class="tishi">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疫情期间进入门诊楼，必须先初筛登记。
        请点击下方登记入口， 实行无接触问询，凭分诊码到相关诊室就医，提高就诊效率。</p>
      <img  src="/static/img/anw.png" alt="" style="width: 100%;margin: 10px 0">
      <p>请大家填写真实信息，每天可更新一次健康状况</p>
    </div>
<!--		<div class="banner">-->
<!--			<swiper class="swiper items" :display-multiple-items="swiperNum">-->
<!--				<block v-for="(item, index) in imgList" :index="index" :key="key">-->
<!--					<swiper-item class="item">-->
<!--						<img :src="item.picUrl" alt="" @click.stop="openChoice(item)">-->
<!--						<p>{{item.name}}</p>-->
<!--					</swiper-item>-->
<!--				</block>-->
<!--			</swiper>-->
<!--		</div>-->
		<div class="main">
			<ul class="tabs">
				<li v-for="(item,index) in tabs" :class="{active:index===currIndex}"  :key="index" @click="tabType(index)">
					{{item.name}}
					<span :class="{line:index===currIndex}"></span>
				</li>
			</ul>
			<div class="content">
				<ul class="items">
					<li class="item" :title="item.name" v-for="(item,index) in levelOne" :key="index" @click="openChoice(item)">{{item.name}}</li>
				</ul>
			</div>
			<div class="choice-box" >
				<van-popup :show="popupVisible" @close="closeVisible" position="bottom" :style="{ height: '40%' }">
					<div class="classify">
						<img :src="selectImg" alt="">
						<div class="txt">
							<p class="name">{{selectName}}</p>
							<div class="desc">{{selectContent}}</div>
							<p class="price">￥{{totalPrice}}/ <span>次</span> </p>
						</div>
					</div>
					<ul class="model-items">
						<li class="item" :title="item.value"  v-for="(item,index) in modelList" @click="choiceItem(item)"   :key="index"  :class="{checked:item.checked}">
							<span class="name">{{item.name}}</span>
							<span class="price">￥{{item.price}}</span>
						</li>
					</ul>
					<div class="btn" @click="confirm">确定</div>
				</van-popup>
			</div>
			<van-dialog id="van-dialog" />
      <van-popup  :show="showPhone" style="margin-top: -200px">
        <div class="valid-box">
          <div class="tip">就诊病人及家属请绑定手机号码并点击确定，以方便你进行初筛登记</div>
          <input v-model.lazy="phone"  type="number" placeholder='绑定手机号码'>
          <div style="display:flex;">
            <span style="background-color: #f1f1f1;color: #000" class="btn2" @click="showPhone=false">取消</span>
            <span class="btn2" @click="newUserValid">确定</span>
          </div>
        </div>
      </van-popup>
		</div>
	</div>

</template>

<script>
import Dialog from '../../../static/vant/dialog/dialog';
export default {
	data() {
		return {
      phone:'',
      showPhone:false,
			swiperNum:3.5,
			curIndex: 0,
			hasHealth:false, //健康档案ID
			selected:'护理',
			detailServiceIds:'', //选择的子类护理ID
			hasChild:false,
			serviceType:null, //护理项目类别
			selectChild:null,//选择的子类护理
			selectContent:'',
			totalPrice:0,
			selectType:'',
			curModel:[], // 当前选中护理项目
			selectName:'',
			selectImg:'',
			modelList:[],
			popupVisible:false,
			currIndex:0,
			imgList:[],
			tabs:[
				{
					name:'基础护理'
				},
				{
					name:'医疗护理'
				},
				{
					name:'中医护理'
				},
			],
			levelOne:[],
			loading:true,
			noOder:false, //是否有最近护理
      ifCommit:false,
      code:null,
      userInfo:{}
		}
	},

  components: {
    Dialog
  },
  watch:{
	  showPhone(n,o){
	    if(n){
        setTimeout(()=>{
          wx.hideTabBar()
        },50)
      }else {
        setTimeout(()=>{
          wx.showTabBar()
        },50)
      }

    }
  },
	beforeMount(){
    this.userId = wx.getStorageSync('userId')
    if(this.userId){
      console.log('已登录');
      this.getHealthList({userId:this.userId})
    }
    this.getNurseList({serviceType:1,size:50})
  },
  mounted(){
  },
	onShow(){
		wx.showTabBar()
    this.userId = wx.getStorageSync('userId')
    // this.openId = wx.getStorageSync('openId')
    if(!this.userId){
      this.wxlogin()
    }else {
      this.getHealthList({userId:this.userId})
    }
	},
	methods: {
    wxlogin() {
      let that = this
      wx.login({
        success(res) {
          that.code=res.code
          console.log(that.code);
          wx.setStorageSync('wxcode', that.code)
          that.getOpenId({code:that.code})
        }
      })
    },
    async getOpenId(params) {
      await this.$fly.request({
        method:'get',
        url:"user/miniLogin",
        params
      }).then(res =>{
        if(res.code === 200) {
            this.openId = res.data.openId
            this.userInfo = res.data.userInfo? res.data.userInfo:''
            let token = res.data.token
            wx.setStorageSync('token',token);
            wx.setStorageSync('openId',this.openId);
            if(this.userInfo){
              wx.setStorageSync('userInfo', this.userInfo);
              wx.setStorageSync('userId', this.userInfo.id);
              wx.setStorageSync('phone', this.userInfo.username);
              this.getNurseList({serviceType:1,size:50})
              this.getHealthList({userId:this.userInfo.id})
            }else {
                this.showPhone =true
            }
        }
      })
    },
    async getIfCommit(params) {
      await this.$fly.request({
        method:'get',
        url:"ncpQuestionnaire/ifCommit",
        params
      }).then(res =>{
        if(res.code === 200) {
          if(res.data===true){
            this.ifCommit =true
          }else {
            this.$router.push({path:'/pages/ad/main'})
            // this.anQue()
          }
        }
      })
    },
    async newUserValid() {
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
                that.getNurseList({serviceType:1,size:50})
                that.getHealthList({userId:that.userInfo.id})
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
    anQue(){
      if(wx.getStorageSync('userId')){
        this.$router.push(
          {path:'/pages/question/main'})
      } else {
        // this.$toast('请先绑定手机号码')
        this.showPhone =true
      }
    },
		//获取健康档案信息
		async getHealthList(params){
			await this.$fly.request({
				method:'get',
				url:"userHealthRecord/list",
				params
			}).then(res =>{
				if(res.code === 200) {
					if(res.data.list.length>0){
						console.log('有个人健康档案');
						this.hasHealth = true
					}else {
						this.hasHealth = false
					}
				}}).catch((req)=>{
				console.log(req)
			})
		},
		//获取最近护理项目列表
		async getRecentList(params){
			await this.$fly.request({
				methods:'get',
				url:"nursingService/recentlyPurchasedList",
				params
			}).then(res =>{
				let data = res.data
				if(res.code === 200) {
					if(data.list.length>0){
						console.log('有最近护理项目')
						this.imgList= data.list
						if(this.imgList.length<4){
							this.swiperNum =this.imgList.length
						}
					}else {
						console.log('无最近护理项目')
						setTimeout(()=>{
							this.noOder = true
							this.getNurseList({common:1,size:5})
						},300)
					}
				}}).catch((req)=>{
				console.log(req)
			})
		},
		//获取护理项目列表
		async getNurseList(params){
		  await this.$fly.get({
				url:"nursingService/list",
				params
			}).then(res =>{
				let data = res.data
				if(res.code === 200) {
					this.levelOne = data.list
					this.levelOne.forEach((i)=>{
						if(i.name.length>8){
							i.name=i.name.slice(0,7)+'...'
						}
					})
					if(this.noOder){
						this.imgList= data.list
					}
				}else if(res.code === 401){
					Dialog.alert({
						message: '账号信息过期，请重新登录'
					}).then(() => {
						wx.reLaunch({url: '../login/main'})
					});
				} else {
					wx.showToast({
						title: '系统开小差了',
						icon: 'loading',
						duration: 2000,
						mask: true,
					});
				}
			}).catch((req)=>{
				console.log(req)
			});
		},
		tabType(index){
			if(this.currIndex===index) return
			this.currIndex=index
			this.serviceType = index+1
			this.getNurseList({serviceType:this.serviceType,size:50})
		},
		closeVisible(){
			this.popupVisible=false
			setTimeout(()=>{
				wx.showTabBar()
			},300)
		},
		openChoice(selectType){
			if(selectType.flag===0){
				this.$toast('此项服务暂不提供外派服务')
				return
			}
			// if(this.hasHealth===false){
			// 	wx.showModal({
			// 		title:'提示',
			// 		content: '您尚未完善健康档案，现在去完善吗？',
			// 		success (res) {
			// 			if (res.confirm) {
			// 				wx.navigateTo({ url:'../phr/main'})
			// 			} else if (res.cancel) {
			// 				console.log('用户点击取消')
			// 			}
			// 		}
			// 	})
			// 	return
			// }
			wx.hideTabBar()
			this.popupVisible=true
			this.modelList= []
			this.selectName= selectType.name
			this.selectContent= selectType.content
			this.selectImg= selectType.picUrl
			this.serviceId =selectType.id
			this.totalPrice =selectType.price // 二级护理价格（没选择子类目时）
		},
		choiceItem(item) {
			this.serviceId = item.serviceId
			this.selItemList = []
			if (typeof item.checked == 'undefined') {
				this.$set(item, 'checked', true)
			} else {
				item.checked = !item.checked
			}
			for (let i = 0; i < this.modelList.length; i++) {
				if (this.modelList[i].checked) {
					this.selItemList.push(this.modelList[i])
				}
			}
			let totalPrice = 0
			let selectChild =''
			let detailServiceIds =''
			this.selItemList.forEach((item)=>{
				totalPrice+=item.price*1
				selectChild += item.name+','
				detailServiceIds += item.id+','
			})
			this.selectChild = selectChild
			this.detailServiceIds = detailServiceIds.substr(0, detailServiceIds.length - 1)
			this.totalPrice =totalPrice
			// console.log(this.detailServiceIds);
		},
		confirm(){
			this.popupVisible=false
			setTimeout(()=>{
				wx.showTabBar()
			},50)
			setTimeout(()=>{
				this.$router.push(
					{path:'/pages/order/write-order/main',query:{
							totalPrice:this.totalPrice,
							serviceId:this.serviceId,
							selectName:this.selectName,
							detailServiceIds:this.detailServiceIds,
							selectContent:this.selectContent,
							selectImg:this.selectImg,
							from:'选项目'
						}
					})
			},100)
		}
	}

}
</script>
<style>
	page{
		color: #2c3e50;
		background:rgba(247,247,247,1);
	}
	.van-popup--bottom{
		border-radius:20px 20px 0 0!important;
	}
  .van-popup{
    border-radius:20px;
  }
  .van-popup--center{
    top:38%!important;
  }
</style>

<style lang="less" scoped>
	.nursing{
		padding-top: 34px;
		margin: 0 22px;
		color: #2c3e50;
    p{
      text-align: center;
      font-size:32px;
    }
    .tishi{
      /*color: #ff0911;*/
      font-size: 36px;
      text-align: left;
      font-weight: 500;
    }
		h2{
			height:110px;
			line-height: 110px;
			text-align: left;
			padding-left: 20px;
			background:rgba(71,189,195,1);
			border-radius:20px 20px 0px 0px;
			font-size:40px;
			font-family:PingFangSC-Medium;
			font-weight:500;
			color:rgba(255,255,255,1);
			text-shadow:0px 2px 4px rgba(42,127,131,0.59);
			background: url('../../../static/img/tit-banner.png') no-repeat center;
			background-size:100%;
		}
		.banner{
			background:rgba(255,255,255,1);
			border-radius:20px;
			overflow: hidden;
			.items{
				height:280px;
				padding: 0 20px;
				.item{
					width:162px;
					height:40px;
					font-size:28px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:40px;
					text-align: left;
					img{
						width:162px;
						height:162px;
						margin: 10px 0;
						display: block;
						border-radius: 8px;
					}
					p{
						width:155px;
						display: -webkit-box;
						-webkit-line-clamp:2;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
					}
				}
			}
			.no-img{
				font-size: 36px;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.main{
			width: 100%;
			min-height:684px;
			background:rgba(255,255,255,1);
			border-radius:20px;
			margin-top: 44px;
			.tabs{
				display: flex;
				justify-content: space-around;
				font-size:32px;
				font-family:PingFangSC;
				font-weight:400;
				align-items: center;
				color:rgba(142,142,147,1);
				background:#F4FCFD;
				height:80px;
				line-height: 80px;
				border-radius:20px 20px 0px 0px;
				text-align: center;
				li{
					flex: 1;
				}
				.active{
					font-size:36px;
					height:94px;
					background:rgba(255,255,255,1);
					border-radius:20px 20px 0px 0px;
					font-family:PingFangSC-Medium,PingFangSC;
					font-weight:500;
					color:rgba(71,189,195,1);
				}
			}
			.content{
				margin-top: 38px;
				.items{
					display: flex;
					flex-wrap: wrap;
					font-size:28px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					max-height: 540px;
					overflow: scroll;
					-webkit-overflow-scrolling: touch;
					.item{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 210px;
						padding: 0 40px;
						box-sizing: border-box;
						height:116px;
						line-height: 1.8;
						background:rgba(246,247,249,1);
						border-radius:10px;
						margin-left: 18px;
						margin-bottom: 20px;
						color: #1E3748;
					}
				}
			}
		}
		.choice-box{
			width: 100%;
			.classify{
				display: flex;
				padding:50px 30px 40px;
        text-align: left;
				img{
					width:162px;
					height:162px;
					margin-right: 20px;
					border-radius: 8px;
				}
				.txt{
					text-align: left;
					align-items: center;
					flex: 1;
					overflow: hidden;
				}
				.name{
					height:40px;
					font-size:28px;
					font-family:PingFangSC;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:40px;
					width: 500px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
          text-align: left;
				}
				.desc{
					font-size:22px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(102,102,102,1);
					margin: 8px 0 20px;
				}
				.price{
					height:56px;
					font-size:40px;
          text-align: left;
          font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(71,189,195,1);
					line-height:56px;
					span{
						font-size: 24px;
					}
				}
			}
			.model-items{
				display: flex;
				padding: 0 30px 100px;
				flex-wrap: wrap;
				max-height:560px;
				overflow: auto;
				li{
					height:80px;
					width:210px;
					background:rgba(246,247,249,1);
					border-radius:10px;
					border:2px solid rgba(236,236,236,1);
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 20px 20px 0;
					font-size:28px;
					font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(102,102,102,1);
					/*display: -webkit-box;*/
					/*-webkit-line-clamp:2;*/
					/*overflow: hidden;*/
					/*text-overflow: ellipsis;*/
					/*-webkit-box-orient: vertical;*/
					.name{
						width:114px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.price{
						color:rgba(153,153,153,1);
					}
				}
				.checked{
					border:solid 4px #47BDC3;
				}
			}
		}
		.btn{
			height:80px;
			line-height: 80px;
			background:rgba(71,189,195,1);
			font-size:28px;
			font-family:PingFangSC-Medium;
			font-weight:500;
			color:rgba(255,255,255,1);
			position: absolute;
			bottom: 0;
			width: 100%;
			text-align: center;
		}
	}
  .valid-box{
    width:650px;
    height: 400px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    color: #333;
    font-size: 35px;
    overflow: hidden;
    .tip{
      padding: 25px 60px;
      height: 170px;
      box-sizing: border-box;
      line-height: 60px;
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
</style>

