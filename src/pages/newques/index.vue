<template>
  <div class="main">
    <h2 style="padding: 20px;margin: 0 auto;text-align: center;color: #FF1706">新型冠状病毒感染流行病学史调查问卷</h2>
    <p v-if="isLook" class="p-tip">填写日期：{{addTime}}</p>
    <div class="content">
      <div class="body-one">
        <van-cell-group>
          <van-field
            size="large"
            label="真实姓名"
            v-model="name"
            placeholder="请输入真实姓名"
            required
            :disabled="isLook"
            @change="changeName"
          />
          <div class="add-btn">
            <span class="tip"><em style="color: red;display: inline-block">*</em>国籍</span>
            <van-radio-group v-model="oversea" :disabled="isLook"   @change="onChangeOversea">
              <van-radio name="0" checked-color="#07c160">国内</van-radio>
              <van-radio name="1" checked-color="#07c160">境外</van-radio>
            </van-radio-group>
          </div>
          <van-field v-if="oversea==1"
            required
                     :disabled="isLook"
                     size="large"
            label="护照"
            v-model="idNumberHz"
            placeholder="请输入护照"
            @change="changeHz"
            type="idcard"
          />
          <van-field v-else
            required
                     :disabled="isLook"
                     size="large"
            label="身份证号"
            v-model="idNumber"
            placeholder="请输入身份证号"
            @change="changeIdNumber"
            type="idcard"
            :error-message=errorIdNumber
        />
          <van-cell required title="性别" :value="gender" size="large" @click="showSex"/>
<!--          <van-field-->
<!--            required-->
<!--            size="large"-->
<!--            label="出生年月"-->
<!--            v-model="healthData.birthday"-->
<!--            placeholder="请填写出生年月(1980-01-01)"-->
<!--            @change="changeBirthday"-->
<!--            :error-message=errorBirthday-->
<!--          />-->
<!--          <van-field-->
<!--            required-->
<!--            size="large"-->
<!--            label="年龄"-->
<!--            v-model="healthData.age"-->
<!--            placeholder="年龄自动计算"-->
<!--            disabled-->
<!--            v-if="!baby"-->
<!--          />-->
<!--          <van-field-->
<!--            v-else-->
<!--            required-->
<!--            size="large"-->
<!--            label="月龄"-->
<!--            v-model="healthData.age2"-->
<!--            placeholder="年龄自动计算"-->
<!--            disabled-->
<!--          />-->
          <van-field
            required
            size="large"
            label="现住址"
            v-model="healthData.residenceAddress"
            placeholder="请输入现住址"
            @change="changeAddress"
            :disabled="isLook"
          />
          <van-field
            required
            size="large"
            label="本人电话"
            v-model="username"
            placeholder="请输入本人电话"
            @change="changePhone"
            :disabled="isLook"
          />
          <van-field
            size="large"
            label="联系人"
            v-model="healthData.residenceContact"
            placeholder="请输入联系人"
            @change="changeContact"
            :disabled="isLook"
          />
          <van-field
            size="large"
            label="联系电话"
            v-model="healthData.residenceContactPhone"
            placeholder="请输入联系人电话"
            @change="changeContactPhone"
            :disabled="isLook"
          />
          <van-field
            required
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
        <div class="desc">
          &nbsp;&nbsp;&nbsp;&nbsp;根据新型冠状病毒肺炎疫情防控要求，请如实填写下面的调查内容，
          如有隐瞒不报或者填写内容不属实，个人承担相关法律责任。
          <p>承诺人：{{name}}</p>
          <p>日期：{{currDate}}</p>
        </div>
        <div class="card">
          <span class="tip">1</span><em style="color: red;display: inline-block">*</em>
          近14天内您有到过以下地方吗？
          <van-checkbox-group v-model="answer1" direction="horizontal" @change="onChange1" :disabled="isLook" >
            <van-checkbox name="0" :disabled="disabled1" checked-color="#07c160">国外</van-checkbox>
            <input v-if="showOther1" class="input" v-model.lazy="answer011" placeholder="请填写具体国家和地区"/>
            <van-checkbox name="1" :disabled="disabled1" checked-color="#07c160">湖北或武汉</van-checkbox>
            <van-checkbox name="2" :disabled="disabled1" checked-color="#07c160">其他有病例报告的社区</van-checkbox>
            <van-checkbox name="3"  checked-color="#07c160">都没有</van-checkbox>
          </van-checkbox-group>
        </div>
        <div class="card">
          <span class="tip">2</span><em style="color: red;display: inline-block">*</em>
          发病前您接触过以下地区来的发热或有呼吸道症状的患者吗？
          <van-checkbox-group v-model="answer2" direction="horizontal" @change="onChange2" :disabled="isLook" >
            <van-checkbox name="0" :disabled="disabled2" checked-color="#07c160">国外</van-checkbox>
            <input v-if="showOther2" class="input" v-model.lazy="answer021" placeholder="请填写具体国家和地区"/>
            <van-checkbox name="1" :disabled="disabled2" checked-color="#07c160">湖北或武汉</van-checkbox>
            <van-checkbox name="2" :disabled="disabled2" checked-color="#07c160">其他有病例报告的社区  </van-checkbox>
            <van-checkbox name="3"  checked-color="#07c160">都没有</van-checkbox>
          </van-checkbox-group>
        </div>
        <div class="card">
          <span class="tip">3</span><em style="color: red;display: inline-block">*</em>
          3.发病前您接触过新型冠状病毒感染者（核酸检测阳性者）吗？
          <van-radio-group :value="answer3" @change="onChange3" :disabled="isLook" >
            <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
          </van-radio-group>
        </div>
        <div class="card">
          <span class="tip">4</span><em style="color: red;display: inline-block">*</em>
          近14天内您的家庭、学校或办公室等小范围内有无出现2例及以上发热和/或呼吸道症状
          <van-radio-group :value="answer4" @change="onChange4" :disabled="isLook" >
            <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
          </van-radio-group>
        </div>
        <div class="card">
          <span class="tip">5</span><em style="color: red;display: inline-block">*</em>
          发病前您是否接触过高风险国家人员？
          <van-radio-group :value="answer5" @change="onChange5" :disabled="isLook" >
            <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="body-three">
          <p>是否有以下症状？（如有请在症状前打勾）</p>
          <div style="margin-top: 10px">
            <van-checkbox-group v-model="answerArr" :disabled="isLook" direction="horizontal" @change="onChangeZz" >
              <van-checkbox name="6"  checked-color="#07c160">发热，自测体温</van-checkbox>
              <input :disabled="!showTW" class="input" v-model.lazy="temp1" placeholder="自测体温(°C)"/>
              <van-checkbox name="7"  checked-color="#07c160">乏力</van-checkbox>
              <van-checkbox name="8"  checked-color="#07c160">咳嗽</van-checkbox>
              <van-checkbox name="9"  checked-color="#07c160">呼吸困难</van-checkbox>
              <van-checkbox name="10"  checked-color="#07c160">呕吐</van-checkbox>
              <input  :disabled="!showOT" class="input" v-model.lazy="answer101" placeholder="呕吐（次/天） "/>
              <van-checkbox name="11"  checked-color="#07c160">腹泻</van-checkbox>
              <input  :disabled="!showFX"  class="input" v-model.lazy="answer111" placeholder="腹泻（次/天） "/>
              <van-checkbox name="12"  checked-color="#07c160">鼻塞</van-checkbox>
              <van-checkbox name="13"  checked-color="#07c160">流涕</van-checkbox>
              <van-checkbox name="14"  checked-color="#07c160">咽痛</van-checkbox>
              <van-checkbox name="15"  checked-color="#07c160">肌痛 </van-checkbox><br>
              <van-checkbox name="16"  checked-color="#07c160">其它症状 </van-checkbox>
              <input style="width: 100%" :disabled="!showQT" class="input" v-model.lazy="answer161" placeholder="其它症状 "/>
            </van-checkbox-group>
          </div>

        <div class="add-btn">
          <span>现场即测体温(°C)：</span>
          <input :disabled="isLook"  v-model.lazy="temp2" type="digit" :maxlength="5" />
        </div>
      </div>
    </div>
    <div v-if="!isSubmit&&!ifCommit" class="btn" @click="saveData">提交</div>
    <div v-else class="btn" @click="goBackIndex">返回</div>
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
    <van-popup :show="show" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmFn"
        @cancel="cancelFn"
      />
    </van-popup>

    <!--选医院-->
    <van-popup :show="showB" position="bottom" :style="{ height: '40%' }">
      <van-picker :columns="hospListName"  @cancel="onCancel"  @confirm="onConfirmB" show-toolbar/>
    </van-popup>
    <van-popup :show="showQrcode" @close="onClose">
      <div class="change-box">
        <img class="qr-code" :src="Qrcode" alt="">
        <p v-if="isRed">请到发热门诊挂号就诊</p>
        <p v-else>请到普通门诊挂号就诊</p>
        <p style="padding: 4px;font-weight:500;">健康码有效</p>
        <p  style="padding:2px 0 5px;color: red;font-size: 14px">有效期：{{currDate}}</p>
      </div>
    </van-popup>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        addTime:'',
        isLook:false,
        answerArr:[],
        showTW:false,
        showOT:false,
        showFX:false,
        showQT:false,
        temp1:null,
        temp2:null,
        oversea:'0',
        disabled1:false,
        disabled2:false,
        errorBirthday:'',
        isRed:false,
        hospital:null,
        hospitalId:null, //医院ID
        hospList:[], //医院列表
        showB:false,
        hospListName:[],
        isSubmit:false,
        Qrcode:null,
        showQrcode:false,
        healthData:{
          birthday:null,
        },
        minDate: new Date(1900,0,1).getTime(),
        maxDate: new Date().getTime(),
        currentDate: new Date(1950,0,1).getTime(),
        show:false,
        currDate:null,
        showSexBox:false,
        answer1:null,
        answer011:null,
        answer2:null,
        answer021:null,
        answer3:null,
        answer4:null,
        answer5:null,
        answer6:null,
        answer7:null,
        answer8:null,
        answer9:null,
        answer10:null,
        answer101:null,
        answer11:null,
        answer111:null,
        answer12:null,
        answer13:null,
        answer14:null,
        answer15:null,
        answer16:null,
        answer161:null,
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
        residenceContact:null,
        residenceContactPhone:null,
        myData:{},
        ifCommit:false,
        baby:false,
        showOther1:false,
        showOther2:false
      }
    },
    onShow() { //返回显示页面状态函数
      this.userId = wx.getStorageSync('userId')
      this.isSubmit=false
      this.ifCommit=false
      this.showQrcode =false
      this.getDay(0, '-'); //获取当前日期
      this.getHospital()
      if(wx.getStorageSync('userId')){
        // this.getIfCommit({userId:this.userId})
        this.getQueList({userId :this.userId,size:2,page:1})
        this.getUserDate({userId:this.userId})
        this.getHealthRecordList({userId:this.userId})
      }else {
        this.$toast('账号信息过期，请重新登录')
      }
    },
    onLoad() {
      // 解决页面返回后，数据没重置的问题
      Object.assign(this, this.$options.data())
    },
    methods: {
      saveData(){
        if(!this.userId){
          this.$toast('用户信息过期，请重新登录')
          return;
        }
        let params ={
          id:this.userId,
          gender:this.gender==='男'?1:2,
          name:this.name,
          username:this.username,
          oversea:this.oversea
        }
        if(this.name===null||this.name===''){
          wx.showToast({title: '请填写真实姓名', icon: 'none'})
          return
        }
        if(this.oversea==0){
          console.log('国内');
          if(this.idNumber===null||this.idNumber===''){
            wx.showToast({title: '请输入身份证号码', icon: 'none'})
            return
          }
          if(this.idNumber){
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
            if (!reg.test(this.idNumber)) {
              wx.showToast({title: "请输入正确的身份证号码", icon: 'none',})
              return;
            }
            params.idNumber=this.idNumber
          }
        }else {
          console.log('国外');
          if(this.idNumberHz===null||this.idNumberHz===''){
            wx.showToast({title: '请输入护照', icon: 'none'})
            return
          }else {
            params.idNumber=this.idNumberHz
          }
        }
        if(this.healthData.residenceAddress===null||this.healthData.residenceAddress===''){
          wx.showToast({title: '请输入现住址', icon: 'none'})
          return
        }
        // if(this.healthData.birthday===null||this.healthData.birthday===''){
        //   wx.showToast({title: '请输入出生年月', icon: 'none'})
        //   return
        // }
        if(this.username===null||this.username===''){
          wx.showToast({title: '请填写手机', icon: 'none'})
          return
        }
        if(this.hospital===null){
          wx.showToast({title: '请选择医院', icon: 'none'})
          return
        }
        if(this.username){
          let reg = /^1[0-9]{10}$/
          if (!reg.test(this.username)) {
            wx.showToast({title: "请输入正确电话号码", icon: 'none',})
            return
          }
          params.username = this.username
        }
        if(this.showOther1){
          if(!this.answer011){
            this.$toast('请填写具体国家')
            return;
          }
        }
        if(this.showOther2){
          if(!this.answer021){
            this.$toast('请填写具体国家')
            return;
          }
        }
        if(this.answerArr.includes('6')){
          if(!this.temp1){
            this.$toast('请填写自测温度')
            return;
          }
        }
        if(this.answerArr.includes('10')){
          if(!this.answer101){
            this.$toast('请填写呕吐（次数/天）')
            return;
          }
        }
        if(this.answerArr.includes('11')){
          if(!this.answer111){
            this.$toast('请填写腹泻（次数/天）')
            return;
          }
        }
        if(this.answerArr.includes('16')){
          if(!this.answer161){
            this.$toast('请填写其它具体症状')
            return;
          }
        }
        // if(this.healthData.birthday){
        //   let reg = /^((((19|20)\d{2})-(0?(1|[3-9])|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/
        //   if (!reg.test(this.healthData.birthday)) {
        //     wx.showToast({title: "请输入合法的出生年月(1980-01-01)", icon: 'none',})
        //     return
        //   }
        // }else if(this.healthData.birthday===''){
        //   wx.showToast({title: "出生年月不能为空", icon: 'none',})
        //   return;
        // }
        if(this.answer1===null||this.answer2===null||this.answer3===null
          ||this.answer4===null ||this.answer5===null){
          this.$toast('必填项不能为空')
          return
        }
        console.log(this.answerArr.length);
        if(!this.answer1.includes('3')||!this.answer2.includes('3')||this.answerArr.length>0
          ||this.oversea==1||this.answer3==1||this.answer4==1||this.answer5==1){
          console.log('红码');
          this.result = 1
          this.isRed = true
        }else {
          this.result = 0
          this.isRed = false
        }
        let that = this
        wx.showModal({
          title:'提示',
          content: '请再次确认信息，您确定现在提交吗？',
          success (res) {
            if (res.confirm) {
              console.log(params);
              that.userUptate(params)
              that.addQue()
              that.editHealthRecord()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      // 获取列表
      async getQueList(params){
        await this.$fly.request({
          methods:'get',
          url:"ncpQuestionnaire3/list",
          params })
          .then(res => {
            if(res.code === 200) {
              if(res.data.list.length>0){
                let data = res.data.list[0]
                console.log(data);
                this.addTime = data.addTime
                this.answer1 =  Array.from(data.answer1)
                this.answer2 =   Array.from(data.answer2)
                this.answer3 =  data.answer3.toString()
                this.answer4 =  data.answer4.toString()
                this.answer5 =  data.answer5.toString()
                console.log(data.answer6);
                if(data.answer6===1){
                  this.answerArr.push('6')
                  this.showTW = true
                }if(data.answer7===1){
                  this.answerArr.push('7')
                }if(data.answer8===1){
                  this.answerArr.push('8')
                }if(data.answer9===1){
                  this.answerArr.push('9')
                }if(data.answer10===1){
                  this.answerArr.push('10')
                  this.showOT = true
                }if(data.answer11===1){
                  this.answerArr.push('11')
                  this.showFX = true
                }if(data.answer12===1){
                  this.answerArr.push('12')
                }if(data.answer13===1){
                  this.answerArr.push('13')
                }if(data.answer14===1){
                  this.answerArr.push('14')
                }if(data.answer15===1){
                  this.answerArr.push('15')
                }if(data.answer16===1){
                  this.answerArr.push('16')
                  this.showQT = true
                }
                console.log(this.answerArr);
                this.hospitalId = data.hospital
                if(this.hospitalId===1){
                  this.hospital = '南部战区总医院'
                }else {
                  this.hospital = '157医院'
                }
                if(this.answer1.includes("3")){
                  this.disabled1 = true
                  this.showOther1 = false
                }else if(this.answer1.includes("0")){
                  this.disabled1 = false
                  this.showOther1 = true
                }
                if(this.answer2.includes("3")){
                  this.disabled2 = true
                  this.showOther2 = false
                }else if(this.answer1.includes("0")){
                  this.disabled2 = false
                  this.showOther2 = true
                }
                if(data.temp1){
                  this.temp1 = data.temp1
                }
                if(data.temp2){
                  this.temp2 = data.temp2
                }
                if(data.answer011){
                  this.answer011 = data.answer011
                }
                if(data.answer021){
                  this.answer021 = data.answer021
                }
                if(data.answer101){
                  this.answer101 = data.answer101
                }
                if(data.answer111){
                  this.answer111 = data.answer111
                }
                if(data.answer161){
                  this.answer161 = data.answer161
                }
              }
            }})
      },
      //根据身份证获取出生年月和性别
      getIdCard(){
        if (this.idNumber.length == 18) {
          let IdCard = this.idNumber
          this.healthData.birthday = IdCard.substring(6, 10) + "-" + IdCard.substring(10, 12) + "-" + IdCard.substring(12, 14);
          //获取性别
          if (parseInt(IdCard.substr(16, 1)) % 2 == 1) {
            console.log('男');
            //男
            this.gender='男'
          } else {
            //女
            console.log('女');
            this.gender='女'
          }
          setTimeout(()=>{
            this.getAge()
          })
        }
      },
      //医院列表
      async getHospital(params){
        await this.$fly.request({
          methods:'get',
          url:"hospital/list",
          params
        }).then(res =>{
          if(res.code === 200) {
            this.hospListName = []
            this.hospList = res.data.list
            this.hospList.forEach((i)=>{
              this.hospListName.push(i.name)
            })
          }else {
            this.$toast(res.message)
          }
        }).catch((req)=>{
          this.$toast(req)
        })
      },
      onCancel(){
        this.showB = false
      },
      onConfirmB(event) {
        const { picker, value, index } = event.mp.detail;
        this.hospital = value
        this.hospitalId = index+1
        this.showB = false
      },
      onClose(){
        this.showQrcode =false
        wx.switchTab({ url: '../index/main' });
      },
      confirmFn(event) { // 确定按钮
        this.currentDate=event.mp.detail
        this.healthData.birthday = this.formatDate(new Date(this.currentDate))
        this.getAge()
        setTimeout(()=>{
          this.show = false
        },100)
      },
      cancelFn(){
        this.show = false;
      },
      showPopFn() {
        this.show = true;
        this.currentDate = 	this.healthData.birthday?new Date(this.healthData.birthday.replace(/-/g,",")).getTime():new Date(1950,0,1).getTime()
      },
      //用户健康档案列表
      async getHealthRecordList(params){
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
      },
      //编辑健康档案
      async editHealthRecord(){
        let params = {
          userId:this.userId,
          residenceAddress:this.healthData.residenceAddress,
          birthday:this.healthData.birthday,
          residenceContactPhone:this.healthData.residenceContactPhone,
          residenceContact:this.healthData.residenceContact,
          gender:this.gender==='男'?1:2,
          name:this.name
        }
        await this.$fly.request({
          method:'post',
          url:"userHealthRecord/add",
          params
        }).then(res =>{
          if(res.code === 200) {
          }}).catch((req)=>{
          console.log(req)
        })
      },
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
      changeContact(event){
        this.healthData.residenceContact = event.mp.detail
      },
      changeContactPhone(event){
        this.healthData.residenceContactPhone = event.mp.detail
      },
      changeAddress (event) {
        this.healthData.residenceAddress = event.mp.detail
      },
      changeBirthday(event){
        this.healthData.birthday = event.mp.detail
        let reg = /^((((19|20)\d{2})-(0?(1|[3-9])|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/
        if (!reg.test(this.healthData.birthday)) {
          this.errorBirthday='请输入合法的出生年月(1980-01-01)'
        }else {
          this.errorBirthday=''
          setTimeout(()=>{
            this.getAge()
          },100)
        }
      },
      changeHz(event){
        this.idNumberHz = event.mp.detail
      },
      changeIdNumber (event) {
        this.idNumber = event.mp.detail
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!reg.test(this.idNumber)) {
          this.errorIdNumber='请输入正确的身份证号码'
        }else {
          this.errorIdNumber=''
        }
      },
      changeName (event) {
        this.name = event.mp.detail
      },
      changeTw(event){
        this.answer11 = event.mp.detail
      },
      // 判断用户的年龄
      getAge(){
        this.baby =false
        if(this.healthData.birthday){
          let birthdays = new Date(this.healthData.birthday.replace(/-/g, "/"));
          let d = new Date()
          let age = d.getFullYear() - birthdays.getFullYear() - (d.getMonth() < birthdays.getMonth()
          || (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1 : 0)
          if(birthdays.getFullYear()>2020){
            this.errorBirthday='请输入合法的出生年月(1980-01-01)'
          }else {
            this.errorBirthday=''
          }
          this.$set(this.healthData,'age',age)
          if(this.healthData.age==0){
            this.baby =true
            setTimeout(()=>{
              this.getBirthSlot()
            },500)
          }
        }
      },
      getBirthSlot (){
        let birthDay = new Date(this.healthData.birthday.replace(/-/g, "/"));
        let nowDate = new Date()
        let date1 = Date.parse(birthDay)
        let date2 = Date.parse(nowDate)
        let day = Math.ceil((date2 - date1) / (60 * 60 * 1000 * 24))
        let age2 = ''
        let year = Math.floor(day / 365)
        let y = day % 365
        let month = Math.floor(y / 30)
        let d = Math.floor(day % 365 % 30)
        // age += year + '岁' + month + '月' +  d + '天'
        age2 += month + '个月'
        console.log(age2);
        this.$set(this.healthData,'age2',age2)
      },
      //性别选择弹窗
      showSex(){
        this.showSexBox = true
      },
      onChangeOversea (event) {
        this.oversea =event.mp.detail
      },
      onChangeZz(event){
        console.log(event.mp.detail);
        this.answerArr = event.mp.detail
        if(this.answerArr.includes('6')){
          this.showTW =true
        }else {
          this.showTW =false
          this.temp1 =''
        }
        if(this.answerArr.includes('10')){
          this.showOT =true
        }else {
          this.showOT =false
          this.answer101 =null
        }
        if(this.answerArr.includes('11')){
          this.showFX =true
        }else {
          this.showFX =false
          this.answer111 =null
        }
        if(this.answerArr.includes('16')){
          this.showQT =true
        }else {
          this.showQT =false
          this.answer161 =null
        }
      },
      onChange1 (event) {
        this.answer1 = event.mp.detail
        console.log(this.answer1);
        if(this.answer1.includes('3')){
          this.disabled1=true
          this.answer1=["3"]
          this.showOther1 = false
        }else if(this.answer1.includes('0')){
          this.showOther1 = true
        }else {
          this.disabled1=false
          this.showOther1=false
        }
        console.log(this.answer1);
      },
      onChange2 (event) {
        this.answer2 = event.mp.detail
        console.log(this.answer2);
        if(this.answer2.includes('3')){
          this.disabled2=true
          this.answer2=["3"]
          this.showOther2 = false
        }else if(this.answer2.includes('0')){
          this.showOther2 = true
        }else {
          this.disabled2=false
          this.showOther2=false
        }
      },
      onChange3 (event) {
        this.answer3 =event.mp.detail
      },

      onChange4 (event) {
        this.answer4 = event.mp.detail
      },
      onChange5 (event) {
        this.answer5 = event.mp.detail
      },
      onChange6 (event) {
        this.answer6 = event.mp.detail
      },
      onChange7 (event) {
        this.answer7 = event.mp.detail
      },
      onChange8 (event) {
        this.answer8 = event.mp.detail
      },
      // 格式化时间
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }else if (type === 'day') {
          return `${value}日`
        }else if (type === 'hour') {
          return `${value}时`
        }else if (type === 'minute') {
          return `${value}分`
        }
        return value;
      },
      // 格式化获取的时间
      formatDate(date) {
        const y = date.getFullYear()
        let M = date.getMonth() + 1
        M = M < 10 ? '0' + M : M
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        let h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        let m = date.getMinutes()
        m = m < 10 ? ('0' + m) : m
        this.birthYear = y
        this.birthMonth = M
        this.birthDay = d
        return y + '-' + M + '-' + d
      },

      async addQue(){
        let params = {
          userId:wx.getStorageSync('userId'),
          answer1:this.answer1.toString(),
          answer2:this.answer2.toString(),
          answer3:parseInt(this.answer3),
          answer4:parseInt(this.answer4),
          answer5:parseInt(this.answer5),
          answer6:this.answerArr.includes('6')?1:0,
          answer7:this.answerArr.includes('7')?1:0,
          answer8:this.answerArr.includes('8')?1:0,
          answer9:this.answerArr.includes('9')?1:0,
          answer10:this.answerArr.includes('10')?1:0,
          answer11:this.answerArr.includes('11')?1:0,
          answer12:this.answerArr.includes('12')?1:0,
          answer13:this.answerArr.includes('13')?1:0,
          answer14:this.answerArr.includes('14')?1:0,
          answer15:this.answerArr.includes('15')?1:0,
          answer16:this.answerArr.includes('16')?1:0,
          hospital:this.hospitalId,
          result:parseInt(this.result)
        }
        if(this.answer011){
          params.answer011= this.answer011
        }
        if(this.answer021){
          params.answer021= this.answer021
        }
        if(this.answer101){
          params.answer101= this.answer101
        }
        if(this.answer111){
          params.answer111= this.answer111
        }
        if(this.answer161){
          params.answer161= this.answer161
        }
        if(this.temp1){
          params.temp1= this.temp1
        }
        if(this.temp2){
          params.temp2= this.temp2
        }
        console.log(this.answerArr);
        console.log(params);
        await this.$fly.request({
          method:'post',
          url:"ncpQuestionnaire3/add",
          params
        }).then(res =>{
          if(res.code === 200) {
            this.$toast('提交成功')
            this.isSubmit =true
            this.Qrcode = res.data
            setTimeout(()=>{
              // wx.navigateBack()
              this.showQrcode =true
            },100)
          }else if(res.message==='重复提交'){
            wx.showModal({
              title:'提示',
              content: '今天您已填写登记表，是否查看健康码？',
              success (res) {
                if (res.confirm) {
                  wx.redirectTo({ url:'../qrcode/main'})
                } else if (res.cancel) {
                  console.log('用户点击取消')
                  wx.navigateBack()
                }
              }
            })
          } else {
            this.$toast(res.message)
          }}).catch((req)=>{
          this.$toast(req)
          console.log(req)
        })
      },

      goBackIndex(){
        wx.navigateBack()
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
            if(this.myData.gender===1){
              this.gender = '男'
            }else {
              this.gender = '女'
            }
            this.username = this.myData.username
            if(!res.data.name){
              console.log('刷新');
              this.onLoad()
            }
            this.oversea = this.myData.oversea.toString()
            this.name = this.myData.name
            this.idNumber = this.myData.idNumber
            this.idNumberHz = this.myData.idNumber

          }
        })
      },
      //编辑个人信息
      async userUptate(params){
        console.log(params);
        await this.$fly.request({
          method:'put',
          url:"user/update",
          params
        }).then(res =>{
          if(res.code === 200) {
            // wx.showToast({title: '修改成功'})
          }else {
            // wx.showToast({title: '修改失败', icon: 'none'})
          }})
      },

      async getIfCommit(params) {
        await this.$fly.request({
          method:'get',
          url:"ncpQuestionnaire3/ifCommit",
          params
        }).then(res =>{
          let that =this
          if(res.code === 200) {
            if(res.data===true){
              this.ifCommit =true
              this.isLook =true
              // wx.showModal({
              //   title:'提示',
              //   content: '今天您已填写登记表，是否查看健康码？',
              //   success (res) {
              //     if (res.confirm) {
              //       wx.redirectTo({ url:'../qrcode/main'})
              //     } else if (res.cancel) {
              //       console.log('用户点击取消')
              //       wx.navigateBack()
              //     }
              //   }
              // })
            }else {
              this.isLook =false
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
  .van-hairline--top-bottom:after{
    border-width: 8px 0!important;
  }
  .van-picker-column__item--selected{
    color: red!important;
  }
  input[disabled]{
    color:#333;
    background-color: #f4f3e4;
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
      border: 1px solid #ccc;
      border-radius: 8px;
      height: 60px;
      line-height: 60px;
      padding-left: 10px;
      margin-top: 20px;
    }
    h2{
      font-size:38px;
      font-family:PingFangSC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:48px;
    }
    .p-tip{
      padding: 0 35px 30px;
      text-align: right;
      color: #8e8e93;
      font-size: 24px;
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
      ._van-checkbox-group{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      ._van-checkbox{
        margin-right: 50px;
      }
      input{
        margin: 0;
      }
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
    .body-three{
      background:rgba(255,255,255,1);
      border-radius:10px;
      transition: all .3s;
      border-top: solid 0.5px #f4f3e4;
      padding:40px 32px;
      ._van-checkbox-group{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      ._van-checkbox{
        margin-right:50px;
      }
      input{
        width: 350px;
        margin: 0;
      }
    }
    .add-btn{
      display: flex;
      align-items: center;
      margin-top: 20px;
      input{
        margin:0 0 0 10px;
      }
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
  .change-box{
    width: 516px;
    padding:0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .qr-code{
      width: 100%;
      height: 516px;
      background-color: #47BDC3;
    }
    .tishi{
      color: #ff0911;
      font-size: 56px;
      text-align: center;
      margin-top: 15px;
      font-weight: 700;
    }
  }
</style>
