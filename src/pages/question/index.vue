<template>
	<div class="main">
		<h2 style="padding: 20px;margin: 0 auto;text-align: center;color: #FF1706">门诊患者新冠肺炎初步筛查登记表</h2>
		<div class="content">
         <div class="body-one">
           <van-cell-group>
             <van-field
               size="large"
               label="真实姓名"
               v-model="name"
               placeholder="请输入真实姓名"
               required
               @change="changeName"
             />
             <van-field
               required
               size="large"
               label="身份证号"
               v-model="idNumber"
               placeholder="请输入身份证号"
               @change="changeIdNumber"
               type="idcard"
               :error-message=errorIdNumber
             />
             <van-cell required title="性别" :value="gender" size="large" @click="showSex"/>
             <van-field
               required
               size="large"
               label="出生年月"
               v-model="healthData.birthday"
               placeholder="请填写出生年月(1980-01-01)"
               @change="changeBirthday"
               :error-message=errorBirthday
             />
<!--             <van-field-->
<!--               required-->
<!--               size="large"-->
<!--               label="出生年月"-->
<!--               v-model="healthData.birthday"-->
<!--               placeholder="请选择出生年月"-->
<!--               disabled-->
<!--               @click="showPopFn"-->
<!--             />-->
             <van-field
               required
               size="large"
               label="年龄"
               v-model="healthData.age"
               placeholder="年龄自动计算"
               disabled
               v-if="!baby"
             />
             <van-field
               v-else
               required
               size="large"
               label="月龄"
               v-model="healthData.age2"
               placeholder="年龄自动计算"
               disabled
             />
             <van-field
               required
               size="large"
               label="现住址"
               v-model="healthData.residenceAddress"
               placeholder="请输入现住址"
               @change="changeAddress"
             />
             <van-field
               required
               size="large"
               label="联系电话"
               v-model="username"
               placeholder="请输入联系电话"
               @change="changePhone"
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
            14天内您是否有意大利、日本、韩国、伊朗等国外疫情高发地区旅居史？
            <van-radio-group :value="answer7" @change="onChange7" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">4</span><em style="color: red;display: inline-block">*</em>
            14天内您居住的社区或身边是否有新冠病毒感染者（核酸检测阳性者）？
            <van-radio-group :value="answer3" @change="onChange3" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">5</span><em style="color: red;display: inline-block">*</em>
            14天内是否接触过有新冠肺炎报告病例社区的发热和呼吸道症状患者？
            <van-radio-group :value="answer4" @change="onChange4" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">6</span><em style="color: red;display: inline-block">*</em>
            身边是否有2人或2人以上存在发热或者干咳、咽痛等呼吸道症状情况？
            <van-radio-group :value="answer5" @change="onChange5" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">7</span>
            本次拟就诊科室
            <input class="input" v-model.lazy="answer6" />
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
	  watch:{
      idNumber(newValue,oldValue){
        if (newValue&&newValue.length==18){
          this.getIdCard()
          setTimeout(()=>{
            if(this.healthData.birthday){
              let reg = /^((((19|20)\d{2})-(0?(1|[3-9])|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/
              if (!reg.test(this.healthData.birthday) ||this.healthData.birthday.substring(0, 4)>2020) {
                this.errorBirthday='请输入合法的出生年月(1980-01-01)'
              }else {
                this.errorBirthday=''
              }
            }
          },1000)
        }
      }
    },
		data() {
      return {
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
        answer2:null,
        answer3:null,
        answer4:null,
        answer5:null,
        answer6:null,
        answer7:null,
        radio:[
          {label: 1, name: '是'},
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
        imgName: '',
        gender:'男', //性别Value
        username:null,
        myData:{},
        ifCommit:false,
        baby:false
      }
		},
		beforeMount(){
		},
		mounted(){
		},
    onShow() { //返回显示页面状态函数
      this.userId = wx.getStorageSync('userId')
      this.isSubmit=false
      this.ifCommit=false
      this.showQrcode =false
      this.getDay(0, '-'); //获取当前日期
      this.getHospital()
      if(this.userId){
        this.getIfCommit({userId:this.userId})
        this.getQueList({userId :this.userId,size:2,page:1})
        this.getUserDate({userId:this.userId})
        this.getHealthRecordList({userId:this.userId})
      }
    },
    onLoad() {
      // 解决页面返回后，数据没重置的问题
      Object.assign(this, this.$options.data())
    },
		methods: {
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
          // 必填项
          // id:this.healthData.id,
          userId:this.userId,
          residenceAddress:this.healthData.residenceAddress,
          birthday:this.healthData.birthday,
          residenceContactPhone:this.username,
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
      onChange1 (event) {
        this.answer1 =event.mp.detail
      },
			onChange2 (event) {
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
      onChange7 (event) {
        this.answer7 = event.mp.detail
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
          answer1:parseInt(this.answer1),
          answer2:parseInt(this.answer2),
          answer3:parseInt(this.answer3),
          answer4:parseInt(this.answer4),
          answer5:parseInt(this.answer5),
          answer7:parseInt(this.answer7),
          answer6:this.answer6,
          hospital:this.hospitalId,
          // ifSend:0,
          result:parseInt(this.result)
        }
        console.log(params);
        await this.$fly.request({
          method:'post',
          url:"ncpQuestionnaire/add",
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
          idNumber:this.idNumber,
        }
        if(this.name===null||this.name===''){
          wx.showToast({title: '请填写真实姓名', icon: 'none'})
          return
        }
        if(this.idNumber===null||this.idNumber===''){
          wx.showToast({title: '请输入身份证号码', icon: 'none'})
          return
        }
        if(this.healthData.residenceAddress===null||this.healthData.residenceAddress===''){
          wx.showToast({title: '请输入现住址', icon: 'none'})
          return
        }
        if(this.healthData.birthday===null||this.healthData.birthday===''){
          wx.showToast({title: '请输入出生年月', icon: 'none'})
          return
        }
        if(this.username===null||this.username===''){
          wx.showToast({title: '请填写手机', icon: 'none'})
          return
        }
        if(this.hospital===null){
          wx.showToast({title: '请选择医院', icon: 'none'})
          return
        }
        if(this.idNumber){
          let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          if (!reg.test(this.idNumber)) {
            wx.showToast({title: "请输入正确的身份证号码", icon: 'none',})
            return;
          }
        }
        if(this.username){
          let reg = /^1[0-9]{10}$/
          if (!reg.test(this.username)) {
            wx.showToast({title: "请输入正确电话号码", icon: 'none',})
            return
          }
          params.username = this.username
        }
        if(this.healthData.birthday){
          let reg = /^((((19|20)\d{2})-(0?(1|[3-9])|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/
          if (!reg.test(this.healthData.birthday)) {
            wx.showToast({title: "请输入合法的出生年月(1980-01-01)", icon: 'none',})
            return
          }
        }else if(this.healthData.birthday===''){
          wx.showToast({title: "出生年月不能为空", icon: 'none',})
          return;
        }
        if(this.answer1===null||this.answer2===null||this.answer3===null||this.answer4===null||this.answer5===null||this.answer7===null
        || this.healthData.residenceAddress===''||this.healthData.birthday===null){
          this.$toast('必填项不能为空')
          return
        }
        if(this.answer1==1||this.answer2==1||this.answer3==1||this.answer4==1||this.answer5==1||this.answer7==1){
          this.result = 1
          this.isRed = true
        }else {
          this.result = 0
          this.isRed = false
        }
        // if(this.errorBirthday){
        //   this.$toast('请填写合法的出生年月')
        //   return
        // }
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
              // this.name =null
              // this.idNumber =null
              // this.healthData ={}
              this.onLoad()
            }
            this.name = this.myData.name
            this.idNumber = this.myData.idNumber
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
          url:"ncpQuestionnaire/ifCommit",
          params
        }).then(res =>{
          let that =this
          if(res.code === 200) {
            if(res.data===true){
              this.ifCommit =true
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
            }
          }
        })
      },

      // 获取列表
      async getQueList(params){
        await this.$fly.request({
          methods:'get',
          url:"ncpQuestionnaire/list",
          params })
          .then(res => {
            if(res.code === 200) {
              if(res.data.list.length>0){
                this.answer1 =  res.data.list[0].answer1.toString()
                this.answer2 =  res.data.list[0].answer2.toString()
                this.answer3 =  res.data.list[0].answer3.toString()
                this.answer4 =  res.data.list[0].answer4.toString()
                this.answer5 =  res.data.list[0].answer5.toString()
                this.answer7 =  res.data.list[0].answer7.toString()
                this.answer6 =  res.data.list[0].answer6
                this.hospitalId = res.data.list[0].hospital
                if(this.hospitalId===1){
                  this.hospital = '南部战区总医院'
                }else {
                  this.hospital = '157医院'
                }
                if(this.answer6==='null'){
                  this.answer6 = ''
                }else {
                  this.answer6 = res.data.answer6
                }
              }
            }})
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
