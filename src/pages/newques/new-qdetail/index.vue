<template>
  <div class="main">
    <h3 style="padding: 20px;margin: 0 auto;text-align: center;color: #FF1706">新型冠状病毒感染流行病学史调查问卷</h3>
    <p style="padding:0 15px 10px;text-align: right">填表时间：{{addTime}}</p>
    <p :class="{red:result==='可疑'}" style="padding:0 15px 10px;text-align: right">初查结果：{{result}}</p>
    <div class="content">
      <div class="body-one">
        <van-cell-group>
          <van-field
            size="large"
            label="真实姓名"
            v-model="name"
            placeholder="请输入真实姓名"
            required
            disabled
          />
          <div class="add-btn">
            <span class="tip"><em style="color: red;display: inline-block">*</em>国籍</span>
            <van-radio-group v-model="oversea" >
              <van-radio  disabled name="0" checked-color="#07c160">国内</van-radio>
              <van-radio  disabled name="1" checked-color="#07c160">境外</van-radio>
            </van-radio-group>
          </div>
          <van-field v-if="oversea==1"
            required
            size="large"
            label="护照"
            v-model="idNumberHz"
            placeholder="请输入护照"
            type="idcard"
            disabled
          />
          <van-field v-else
            required
            size="large"
            label="身份证号"
            v-model="idNumber"
            placeholder="请输入身份证号"
            type="idcard"
            disabled
            :error-message=errorIdNumber
        />
          <van-cell required title="性别" :value="gender" size="large"/>
          <van-field
            required
            disabled
            size="large"
            label="出生年月"
            v-model="healthData.birthday"
            placeholder="请填写出生年月(1980-01-01)"
            :error-message=errorBirthday
          />
          <van-field
            required
            disabled
            size="large"
            label="年龄"
            v-model="healthData.age"
            placeholder="年龄自动计算"
            disabled
            v-if="!baby"
          />
          <van-field
            v-else
            disabled
            required
            size="large"
            label="月龄"
            v-model="healthData.age2"
            placeholder="年龄自动计算"
            disabled
          />
          <van-field
            required
            disabled
            size="large"
            label="现住址"
            v-model="healthData.residenceAddress"
            placeholder="请输入现住址"
          />
          <van-field
            required
            disabled
            size="large"
            label="联系电话"
            v-model="username"
            placeholder="请输入联系电话"
          />
          <van-field
            required
            disabled
            size="large"
            label="医院"
            v-model="hospital"
            placeholder="请选择医院"
            disabled
            @click="showB=true"
          />
        </van-cell-group>
      </div>
      <div class="body-two">
        <div class="card">
          <span class="tip">1</span><em style="color: red;display: inline-block">*</em>
          就诊患者是否有发热（一周内）？
          <van-radio-group :value="answer1"   style="display: flex">
            <van-radio  disabled v-for="(item,index) in radio1" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
          </van-radio-group>
          <div class="add-btn">
            <span><em style="color: red;display: inline-block">*</em>请填写体温：</span>
            <input v-model.lazy="answer11" type="digit" :maxlength="5"  disabled/>
          </div>
        </div>
        <div class="card">
          <span class="tip">2</span><em style="color: red;display: inline-block">*</em>
          就诊患者有没有咳嗽、气促等呼吸道症状？
          <van-radio-group :value="answer2">
            <van-radio  disabled v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
          </van-radio-group>
        </div>
        <div class="card">
          <span class="tip">3</span><em style="color: red;display: inline-block">*</em>
          就诊患者14天内有到过以下地方吗？
          <p style="margin-top: -8px"></p>
          <van-checkbox-group v-model="answer3" direction="horizontal" >
            <van-checkbox  disabled name="0" checked-color="#07c160">都没有</van-checkbox>
            <van-checkbox  disabled name="1" checked-color="#07c160">湖北或武汉</van-checkbox>
            <van-checkbox  disabled name="2" checked-color="#07c160">国（境）外</van-checkbox>
            <van-checkbox  disabled name="3" checked-color="#07c160">其他明确的新冠肺炎疫区</van-checkbox>
          </van-checkbox-group>
          <div v-if="showOther">
            <span>如果有请填写具体国家和地区</span>
            <input class="input" v-model.lazy="answer31" disabled/>
          </div>
        </div>
        <div class="card">
          <span class="tip">4</span><em style="color: red;display: inline-block">*</em>
          就诊患者14天内接触过来自湖北、武汉，或境内其他有病例报告社区的发热或有呼吸道症状的患者？
          <van-radio-group :value="answer4"  >
            <van-radio  disabled v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
          </van-radio-group>
        </div>
        <div class="card">
          <span class="tip">5</span><em style="color: red;display: inline-block">*</em>
          就诊患者14天内接触过新冠肺炎确诊病例、疑似病例和无症状感染者吗？
          <van-radio-group :value="answer5" >
            <van-radio  disabled v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
          </van-radio-group>
        </div>
        <div class="card">
          <span class="tip">6</span><em style="color: red;display: inline-block">*</em>
          就诊患者14天内接触过外籍人员或境外返回人员吗？
          <van-radio-group :value="answer6" >
            <van-radio  disabled v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
          </van-radio-group>
        </div>
        <div class="card">
          <span class="tip">7</span><em style="color: red;display: inline-block">*</em>
          就诊患者14天内有无小范围内（如家庭、办公室、学校班级、车间等场所）出现2例及以上发热或呼吸道症状的病例？
          <van-radio-group :value="answer7" >
            <van-radio  disabled  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
          </van-radio-group>
        </div>
        <div class="card">
          <span class="tip">8</span><em style="color: red;display: inline-block">*</em>
          是否保证上述内容属实？
          <van-radio-group :value="answer8" >
            <van-radio  disabled v-for="(item,index) in radio2" :name="item.label" :key="item" checked-color="#07c160" style="margin-bottom: 15px">{{item.name}}</van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        addTime:null,
        result:0,
        oversea:'0',
        disabled:false,
        errorBirthday:'',
        isRed:false,
        hospital:null,
        hospitalId:null, //医院ID
        hospList:[], //医院列表
        showB:false,
        isSubmit:false,
        Qrcode:null,
        showQrcode:false,
        healthData:{
          birthday:null,
        },
        show:false,
        currDate:null,
        showSexBox:false,
        answer1:null,
        answer11:null,
        answer2:null,
        answer3:[],
        answer4:null,
        answer5:null,
        answer6:null,
        answer7:null,
        answer8:null,
        answer31:null,
        radio:[
          {label: 1, name: '是'},
          {label: 0, name: '否'}
        ],
        radio1:[
          {label: 1, name: '发热（≥37.3℃）'},
          {label: 0, name: '正常'}
        ],
        radio2:[
          {label: 1, name: '是（如有隐瞒，将承担法律责任）'},
          {label: 0, name: '否'}
        ],
        errorPhone:'',
        errorIdNumber:'',
        name:null, //姓名
        birthYear:null,
        birthMonth:null,
        birthDay:null,
        phone:null, //电话
        idNumber:null,//身份证
        idNumberHz:null,//护照
        imgName: '',
        gender:'男', //性别Value
        username:null,
        myData:{},
        ifCommit:false,
        baby:false,
        showOther:false
      }
    },
    onShow() {
      this.userId = wx.getStorageSync('userId')
      this.qId =this.$route.query.id
      this.getUserDate({userId:this.userId})
      this.getDetail({id:this.qId})
      this.getHealthRecordList()
    },
    methods: {
      //用户健康档案列表
      async getHealthRecordList(){
        let params = {
          userId:this.userId
        }
        await this.$fly.request({
          method:'get',
          url:"userHealthRecord/list",
          params
        }).then(res =>{
          if(res.code === 200){
            if(res.data.list.length>0){  //有健康档案
              console.log('有健康档案')
              this.healthData=res.data.list[0]
              this.getAge()
            }else {
              console.log('无健康档案')
            }
          }}).catch((req)=>{
          console.log(req)
        })
        console.log(this.isEdit);
      },
      async getDetail(params){
        await this.$fly.request({
          method:'get',
          url:"ncpQuestionnaire3/detail",
          params
        }).then(res =>{
          if(res.code === 200) {
            let data = res.data
            this.answer1 =  data.answer1.toString()
            this.answer2 =  data.answer2.toString()
            this.answer3 =  Array.from(data.answer3)
            this.answer4 =  data.answer4.toString()
            this.answer5 =  data.answer5.toString()
            this.answer6 =  data.answer6.toString()
            this.answer7 =  data.answer7.toString()
            this.answer8 =  data.answer8.toString()
            this.hospitalId = data.hospital
            this.addTime = data.addTime
            console.log(data);
            if(this.hospitalId===1){
              this.hospital = '南部战区总医院'
            }else {
              this.hospital = '157医院'
            }
            if(data.result===1){
              this.result = '可疑'
            }else {
              this.result = '正常'
            }
            if(this.answer3.includes("0")){
              this.disabled = true
              this.showOther = false
            }else {
              this.disabled = false
              this.showOther = true
            }
            if(data.answer31){
              this.answer31 = data.answer31
            }
            if(data.answer11){
              this.answer11 = data.answer11
            }
          }else {
            this.$toast(res.message)
          }}).catch((req)=>{
          console.log(req)
        })
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
            this.username = this.myData.username
            this.email = this.myData.email
            this.phone = this.myData.phone
            this.idNumber = this.myData.idNumber
            this.birthYear = this.myData.birthYear
            this.birthMonth=this.myData.birthMonth
            this.birthDay=this.myData.birthDay
            this.avatar = this.myData.avatar
            this.oversea = this.myData.oversea.toString()
            this.idNumberHz = this.myData.idNumber
            if(this.myData.gender===1){
              this.gender = '男'
            }else {
              this.gender = '女'
            }
          }
        })
      },
      // 判断用户的年龄
      getAge(){
        if(this.healthData.birthday){
          let birthdays = new Date(this.healthData.birthday.replace(/-/g, "/"));
          let d = new Date()
          let age = d.getFullYear() - birthdays.getFullYear() - (d.getMonth() < birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1 : 0)
          this.healthData.age = age
        }
        console.log(this.healthData.age);
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
  .van-hairline--top-bottom:after{
    border-width: 8px 0!important;
  }
  .van-picker-column__item--selected{
    color: red!important;
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
  .content>>>.van-radio{
    margin-bottom: 10px;
  }
  .add-btn>>>.van-radio{
    margin-left: 30px;
  }
</style>

<style lang="less" scoped>
  .main {
    padding-top: 10px;
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
      border: 1px solid #ccc;
      border-radius: 8px;
      height: 60px;
      line-height: 60px;
      padding-left: 10px;
      margin-top: 20px;
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
    .body-one{
      .add-btn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0 5px 18px;
        /*border-bottom: solid #f4f3e4 0.5px;*/
      }
    }
    .body-two{
      background:rgba(255,255,255,1);
      border-radius:10px;
      transition: all .3s;
      padding:40px 32px 5px;
      .desc{
        line-height: 1.8;
        font-size: 30px;
        margin: 20px 0;
        color: #FF1706;
        p{
          text-align: right;
        }
      }
      .card{
        margin: 50px 0;
        line-height:2;
        .tip{
          margin: 10px 10px 10px 0;
        }
      }
      .add-btn{
        display: flex;
        align-items: center;
        margin-top: 12px;
        input{
          margin:0 0 0 10px;
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
  .red{
    color: #ff1607!important;
  }
</style>
