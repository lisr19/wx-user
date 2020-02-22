<template>
	<div class="main">
<!--		<h2 style="padding: 20px">问卷</h2>-->
		<div class="content">
         <div class="body-one">
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
               label="年龄"
               v-model="idNumber"
               placeholder="请输入年龄"
               @change="changeAge"
             />
             <van-field
               size="large"
               label="身份证号"
               v-model="idNumber"
               placeholder="请输入身份证号"
               :error-message='errorIdNumber'
               @change="changeIdNumber"
             />
             <van-field
               size="large"
               label="现住址"
               v-model="username"
               placeholder="请输入现住址"
               @change="changePhone"
             />
             <van-field
               size="large"
               label="联系电话"
               v-model="username"
               placeholder="请输入联系电话"
               @change="changePhone"
               :error-message='errorPhone'
             />
           </van-cell-group>
         </div>
				<div class="body-two">
					<h2>门诊患者新冠肺炎初步筛查登记表：</h2>
					<div class="card">
            <span class="tip">1</span><em style="color: red;display: inline-block">*</em>
            3日内 (《12岁患儿2日内 )是否有发热、干咳、腹泻、乏力、咽痛等呼吸道症状？
            <van-radio-group :value="answer1" @change="onChange1"  style="display: flex">
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
					</div>
          <div class="card">
            <span class="tip">2</span><em style="color: red;display: inline-block">*</em>
            14天内是否到过武汉及周边地区或接触过来自该地区人员？
            <van-radio-group :value="answer2" @change="onChange2" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">3</span><em style="color: red;display: inline-block">*</em>
            14天内您居住的社区或身边是否有新冠病毒感染者（核酸检测阳性者）？
            <van-radio-group :value="answer3" @change="onChange3" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">4</span><em style="color: red;display: inline-block">*</em>
            14天内是否接触过有新冠肺炎报告病例社区的发热和呼吸道症状患者？
            <van-radio-group :value="answer4" @change="onChange4" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">5</span><em style="color: red;display: inline-block">*</em>
            身边是否有2人或2人以上存在发热或者干咳、咽痛等呼吸道症状情况？
            <van-radio-group :value="answer5" @change="onChange5" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">6</span>
            本次拟就诊科室
            <input class="input" v-model="answer6" />
          </div>
				</div>
		</div>
		<div class="btn" @click="saveData">提交</div>
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
        showSexBox:false,
        answer1:null,
        answer2:null,
        answer3:null,
        answer4:null,
        answer5:null,
        answer6:null,
        radio:[
          {label: 0, name: '否'},
          {label: 1, name: '是'}
        ],
        errorPhone:'',
        errorIdNumber:'',
        name:null, //姓名
        birthYear:null,
        birthMonth:null,
        birthDay:null,
        phone:null, //电话
        idNumber:null,//身份证
        imgName: '',
        gender:1, //性别Value
        username:null,
        myData:{}
      }
		},
		beforeMount(){
			this.userId = wx.getStorageSync('userId')
      this.getUserDate({userId:this.userId})

		},
		mounted(){
		},
    // onShow() { //返回显示页面状态函数
    //   this.getHealthRecordList()
    // },
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
      changePhone (event) {
        this.username = event.mp.detail
        let reg = /^1[0-9]{10}$/
        if (!reg.test(this.username)) {
          this.errorPhone='请输入正确电话号码'
        }else {
          this.errorPhone=''
        }
      },
      changeAge (event) {

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
      onChange1 (event) {
        this.answer1 =event.mp.detail
      },
			onChange2 (event) {
        console.log(2222);
				this.answer2 = event.mp.detail
      },
			onChange3 (event) {
				this.answer3 = event.mp.detail
			},
			onChange4 (event) {
				this.answer4 = event.mp.detail
			},
      onChange5 (event) {
        this.answer5 = event.mp.detail
      },
      async addQue(){
        if(this.answer1===null||this.answer2===null||this.answer3===null||this.answer4===null||this.answer5===null){
          this.$toast('必填项不能为空')
          return 
        }
        if(this.answer1===0||this.answer2===0||this.answer3===0||this.answer4===0||this.answer5===0){
          this.result = 0
        }else {
          this.result = 1
        }
        let params = {
          userId:this.userId,
          answer1:this.answer1,
          answer2:this.answer2,
          answer3:this.answer3,
          answer4:this.answer4,
          answer5:this.answer5,
          result:this.result
        }
        console.log(params);
        await this.$fly.request({
          method:'post',
          url:"ncpQuestionnaire/add",
          params
        }).then(res =>{
          if(res.code === 200) {

          }else {
            this.$toast(res.message)
          }}).catch((req)=>{
          console.log(req)
        })
      },
			saveData(){
        this.addQue()
			},

			goBack(){
        wx.showModal({
          title:'提示',
          content: '是否放弃修改？',
          success (res) {
            if (res.confirm) {
              wx.navigateBack()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
			},
			//获取当前时间
			getDay(num, str) {
				let today = new Date();
				let nowTime = today.getTime();
				let ms = 24*3600*1000*num;
				today.setTime(parseInt(nowTime + ms));
				let oYear = today.getFullYear();
				let oMoth = (today.getMonth() + 1).toString();
				if (oMoth.length <= 1) oMoth = '0' + oMoth;
				let oDay = today.getDate().toString();
				if (oDay.length <= 1) oDay = '0' + oDay;
				this.currDate = oYear + str + oMoth + str + oDay
				console.log(this.currDate);
				// return oYear + str + oMoth + str + oDay;
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
<style scoped>
	.content>>>._van-radio-group{
		margin: 25px 0 5px;
	}
	.content>>>._van-radio{
		margin-right: 40px;
	}
	.content>>>._van-checkbox{
		margin: 20px;
	}
	.content>>>._van-radio-group{
		display: flex;
		flex-wrap: wrap;
	}
</style>

<style lang="less" scoped>
	.main {
		padding-top: 10px;
		padding-bottom: 80px;
		background-color: #F7F7F7;
		min-height: 100%;
    .head{
      height:90px;
      line-height:90px;
      background:rgba(245,245,245,1);
      font-size: 34px;
      display: flex;
      align-items: center;
      position: fixed;
      font-family:PingFangSC;
      font-weight:500;
      top: 50px;
      left: 0;
      width: 100%;
    }
		input{
			border-bottom: 1px solid #ccc;
			border-radius: 8px;
			height: 60px;
			line-height: 60px;
			padding-left: 10px;
		}
		h2{
			height:56px;
			font-size:40px;
			font-family:PingFangSC;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:56px;
			text-align: left;
		}
		.content{
			background-color: #fff;
			/*padding: 0 32px;*/
			margin-bottom: 20px;
		}
		.btn{
			width: 90%;
			height:80px;
			text-align: center;
			line-height: 80px;
			background:rgba(71,189,195,1);
			border-radius:10px;
			font-size:30px;
			font-family:PingFangSC;
			font-weight:600;
			color:rgba(255,255,255,1);
			margin: 70px auto 0;
		}
		.body-two{
			background:rgba(255,255,255,1);
			border-radius:10px;
			transition: all .3s;
			padding:40px 32px 5px;
			.card{
				margin: 50px 0;
				.tip{
					margin: 10px 10px 10px 0;
				}
			}
			h4{
				font-size:30px;
				font-family:PingFangSC;
				font-weight:400;
				color:rgba(68,68,68,1);
			}
			.tip2{
				display: flex;
				align-items: center;
				margin-top: 10px;
				span{
					display: flex;
					font-size:24px;
					font-family:PingFangSC;
					font-weight:400;
					color:rgba(153,153,153,1);
					em{
						color: red;
					}
				}
			}
			.tip{
				width:44px;
				height:44px;
				line-height: 40px;
				background:rgba(255,255,255,1);
				border-radius:4px;
				border:2px solid rgba(102,102,102,1);
				display: inline-block;
				text-align: center;
				margin-right: 20px;
			}
			.hg{
				display:flex;
				align-items: center;
				border-top:1px solid #DEDEDE;
			}
			.mmHg{
				text-align: left;
				border-top:1px solid #DEDEDE;
				padding-top: 0.53rem
			}
			.explain{
				font-size:24px;
				font-family:PingFangSC;
				font-weight:400;
				color:rgba(153,153,153,1);
				margin: 10px 0;
			}
			.cerebralApoplexyFactor{
				margin-top: 20px;
				span{
					margin-right: 30px;
				}
			}
		}
	}
</style>
