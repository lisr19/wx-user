<template>
	<div class="main">
		<h2 style="padding: 20px;margin: 0 auto;text-align: center;color: #FF1706">
      “新型冠状病毒”<br>
      流行病学史调查如实告知承诺书

    </h2>
		<div class="content">
<!--        <p class="add-time">上次填表时间：{{myData.addTime}}</p>-->
        <div class="desc">  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了进一步做好新型冠状病毒肺炎的诊断和治疗，
          有效控制疫情传播蔓延，请您如实配合以下相关流行病学史调查：</div>
         <div class="body-one">
           <van-cell-group>
             <van-field
               size="large"
               label="科室"
               v-model="department"
               placeholder="请填写科室"
               required
               @change="changeKs"
             />
             <van-field
               size="large"
               label="床号"
               v-model="bedNo"
               placeholder="请填写床号"
               required
               @change="changeBed"
             />
             <van-field
               size="large"
               label="姓名"
               v-model="name"
               placeholder="请填写真实姓名"
               required
               @change="changeName"
             />
             <van-field
               size="large"
               label="ID"
               v-model="userCode"
               placeholder="请填写编号"
               required
               @change="changeCode"
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
					<div class="card">
            <span class="tip">1</span><em style="color: red;display: inline-block">*</em>
            发病前14天内有武汉市及周边地区、境外或其他有病例报告社区的旅行史或居住史？
            <van-radio-group :value="answer1" @change="onChange1"  style="display: flex">
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
					</div>
          <div class="card">
            <span class="tip">2</span><em style="color: red;display: inline-block">*</em>
            发病前14天内与NCP感染者（核酸检测阳性者）有接触史？
            <van-radio-group :value="answer2" @change="onChange2" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">3</span><em style="color: red;display: inline-block">*</em>
            发病前14天内曾接触过来自武汉及周边地区，境外或来自有病例报告社区的发热或有呼吸道症状的患者？
            <van-radio-group :value="answer3" @change="onChange3" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">4</span><em style="color: red;display: inline-block">*</em>
            周围人是否有聚集性发病？
            <van-radio-group :value="answer4" @change="onChange4" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">5</span><em style="color: red;display: inline-block">*</em>
            在14天内有无参加聚会、走亲访友、有无亲朋来访等聚众活动？
            <van-radio-group :value="answer5" @change="onChange5" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">6</span><em style="color: red;display: inline-block">*</em>
            家庭成员或陪人有无发热、乏力、呼吸道症状、腹泻等症状？
            <van-radio-group :value="answer6" @change="onChange6" >
              <van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
            </van-radio-group>
          </div>
          <div class="card">
            <span class="tip">7</span>
            其他需要说明的情况：
            <input class="input" v-model.lazy="answer7" />
          </div>
				</div>
      <div class="body-one">
        <van-cell-group>
          <van-field
            size="large"
            label="患者签字"
            v-model="signature"
            placeholder="请患者签字"
            @change="changeHz"
          />
          <van-field
            size="large"
            label="代签人签字"
            v-model="allograph"
            placeholder="请代签人签字"
            @change="changeDq"
          />
          <van-field
            size="large"
            label="代签人与患者关系"
            v-model="relationName"
            placeholder="请选择代签人与患者关系"
            disabled
            @click="showC=true"
          />
        </van-cell-group>
      </div>
		</div>
		<div class="btn" @click="saveData">提交</div>


    <!--选医院-->
    <van-popup :show="showB" position="bottom" :style="{ height: '40%' }">
      <van-picker :columns="hospListName"  @cancel="onCancel"  @confirm="onConfirmB" show-toolbar/>
    </van-popup>

    <van-popup :show="showA" position="bottom" :style="{ height: '80%' }"   @close="onClose" >
      <div class="p-main">
        <h2>给住院患者的一封信</h2>
        <div class="txt">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的病友：</p><br><br>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您好，在新冠肺炎疫情防控的特殊时期，为落实依法防控措施，
            满足广大患者的诊疗需求，切实营造安全规范的住院环境，我们特别为您作出以下指引，请您遵守。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、患者新入院时，须测量体温；如有配合医生完成新冠肺炎相关的流行病学史核查
            ，签订安全告知书。若拒不配合或有意隐瞒病史被发现者，则按相关条例进行处置。新入院家属、
            陪护体温如有异常，拒绝进入病房。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、病区所有人员（患者、家属、陪护）需每天测量体温一次。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三、出入病区时均需自备口罩并正确佩戴，接触患者前后须严格洗手，
            加强手卫生。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;四、因病情危重、手术后或生活不能自理的患者，
            可经主诊医生和护士长申请陪护，每位患者限1人。
            陪护人员不能随意更换，若需更换，需经主诊医生和护士长同意。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;五、住院期间不接受来院探视，以免交叉感染。确因诊疗需要来访者，
            需正确配戴口罩，按病区指引标识进出，不得随意走动，不触摸病区设施，与旁人保持一米距离。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;六、探视时间为每天15:00-16:00。探视时请走门诊探视专门通道，
            每次探视时间不超过30分钟，人员最多一人。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;七、请保持病区肃静，禁止喧哗。
            陪护人员应主动配合医务人员做好病区的消毒隔离及诊疗工作，同时积极协助患者树立战胜疾病的信心。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;八、保持病房空气清新，每日应开窗通风2次，每次30分钟。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;九、疫情防控期间，请不要下楼散步，不能串病房聊天，
            禁止离开医院或进入家属区。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;十、外出检查时，请先做好防护戴好口罩，尽早完成检查，
            返回病房请及时洗手。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;十一、如符合下列情况之一者，谢绝探视和陪护：<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、发热37.2℃及以上；<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、近一个月内有接触来自湖北特别是武汉地区的人员或曾在上述地区居住或停留的人员；<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、近一个月内曾接触有确诊病例居住地的发热或有呼吸道症状的患者；<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、近一个月内有哺乳动物、禽类等接触史，尤其是野生动物接触史<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、身边人有聚集性发病，或与新型冠状病毒感染者有流行病学关联者；<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6、两周内存在咳嗽、鼻塞、流涕、头晕、胸痛、胸闷等其他可疑不适症状；<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7、不能自行正确佩戴口罩，不能遵守上述规定。<br>
          </div>

        </div>
        <div class="btn" @click="onClose">我已阅读</div>
      </div>
    </van-popup>

    <!--选用户关系-->
    <van-popup :show="showC" position="bottom" :style="{ height: '40%' }">
      <van-picker :columns="relationList"  @cancel="onCancel" @confirm="onConfirmC"   value-key="itemName"  default-index="id" show-toolbar/>
    </van-popup>
	</div>
</template>

<script>

	export default {

		data() {
      return {
        // 用户关系
        relationList:[
          {
            itemName:'夫妻',
            key:1
          },
          {
            itemName:'子女',
            key:2
          },
          {
            itemName:'亲属',
            key:3
          },
          {
            itemName:'陪人',
            key:4
          },
          {
            itemName:'保姆',
            key:5
          },
        ],
        hospListName:[],
        relationName:null,
        showA:true,
        showC:false,
        hospital:null,
        hospitalId:null, //医院ID
        hospList:[], //医院列表
        showB:false,
        show:false,
        department:null,
        bedNo:null,
        userCode:null,
        signature:null,
        allograph:null,
        relation:null,
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
        name:null, //姓名
        username:null,
        myData:{},
      }
		},
		beforeMount(){
			this.userId = wx.getStorageSync('userId')
      if(this.userId){
        this.getUserDate({userId:this.userId})
        this.getList({userId:this.userId})
      }
		},
		mounted(){
		},
    onShow() { //返回显示页面状态函数
      this.userId = wx.getStorageSync('userId')
      this.getHospital()

    },
    onLoad() {
      // 解决页面返回后，数据没重置的问题
      Object.assign(this, this.$options.data());
    },
		methods: {
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

      //列表
      async getList(params){
        await this.$fly.request({
          methods:'get',
          url:"ncpQuestionnaire1/list",
          params
        }).then(res =>{
          if(res.code === 200) {
            this.myData =res.data.list[0]?res.data.list[0]:{}
            this.answer1 = this.myData.answer1.toString()
            this.answer2 = this.myData.answer2.toString()
            this.answer3 = this.myData.answer3.toString()
            this.answer4 = this.myData.answer4.toString()
            this.answer5 = this.myData.answer5.toString()
            this.answer6 = this.myData.answer6.toString()
            this.answer7 = this.myData.answer7
            this.department = this.myData.department
            this.bedNo = this.myData.bedNo
            this.userCode = this.myData.userCode
            this.signature = this.myData.signature
            this.allograph = this.myData.allograph
            this.relation = this.myData.relation
            this.hospitalId = this.myData.hospital
            if(this.myData.hospital===1){
              this.hospital =  '南部战区总医院'
            }else {
              this.hospital =  '157医院'
            }
            this.relationList.forEach((item,index)=>{
              if(item.key===this.myData.relation){
                this.relationName=item.itemName
              }
            })

          }else {
            this.$toast(res.message)
          }
        }).catch((req)=>{
          this.$toast(req)
        })
      },
      //提交
      async addQue(){
        let params = {
          userId:this.userId,
          answer1:parseInt(this.answer1),
          answer2:parseInt(this.answer2),
          answer3:parseInt(this.answer3),
          answer4:parseInt(this.answer4),
          answer5:parseInt(this.answer5),
          answer6:parseInt(this.answer6),
          result:parseInt(this.result),
          hospital:this.hospitalId,
        }
        if(this.answer7){
          params.answer7 =this.answer7
        }
        if(this.relation){
          params.relation =this.relation
        }
        if(this.department){
          params.department =this.department
        }
        if(this.bedNo){
          params.bedNo =this.bedNo
        }
        if(this.userCode){
          params.userCode =this.userCode
        }
        if(this.signature){
          params.signature =this.signature
        }
        if(this.allograph){
          params.allograph =this.allograph
        }
        console.log(params);
        await this.$fly.request({
          method:'post',
          url:"ncpQuestionnaire1/add",
          params
        }).then(res =>{
          if(res.code === 200) {
            this.$toast('提交成功')
            setTimeout(()=>{
              wx.navigateBack()
            },1000)
          }else {
            this.$toast(res.message)
          }}).catch((req)=>{
          this.$toast(req)
          console.log(req)
        })
      },

      onCancel(){
        this.showB = false
        this.showC = false
        this.showA = false
      },
      onConfirmC(event) {
        const { picker, value } = event.mp.detail;
        console.log(value);
        this.relation = value.key
        this.relationName = value.itemName
        this.showC = false
      },
      onConfirmB(event) {
        const { picker, value, index } = event.mp.detail;
        this.hospital = value
        this.hospitalId = index+1
        this.showB = false
      },
      onClose(){
        this.showA =false
      },
      cancelFn(){
        this.show = false;
      },
      changeName (event) {
        this.name = event.mp.detail
      },
      changeBed(event){
        this.bedNo = event.mp.detail
      },
      changeKs(event){
        this.department = event.mp.detail
      },
      changeCode(event){
        this.userCode = event.mp.detail
      },
      changeHz(event){
        this.signature = event.mp.detail
      },
      changeDq(event){
        this.allograph = event.mp.detail
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
      onChange6 (event) {
        this.answer6 = event.mp.detail
      },

      saveData(){
        let params ={
          id:this.userId,
          name:this.name,
        }
        if(this.name===null||this.name===''){
          wx.showToast({title: '请填写真实姓名', icon: 'none'})
          return
        }
        if(this.hospital===null){
          wx.showToast({title: '请选择医院', icon: 'none'})
          return
        }
        if(this.answer1===null||this.answer2===null||this.answer3===null||this.answer4===null
          ||this.answer5===null ||this.answer6===null){
          this.$toast('必填项不能为空')
          return
        }
        if(this.answer1==1||this.answer2==1||this.answer3==1||this.answer4==1||this.answer5==1||this.answer6==1){
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
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      goBackIndex(){
        wx.navigateBack()
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
            this.username = this.myData.username
            // if(!res.data.name){
            //   console.log('刷新');
            //   this.onLoad()
            // }
            this.name = this.myData.name
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
  .content>>>.van-cell__title{
    max-width: 300px!important;
  }
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
      /*.add-time{*/
      /*  text-align: left;*/
      /*}*/
      .desc{
        padding: 25px;
      }
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
  .p-main{
    padding: 30px 20px;
    overflow: auto;
    font-size: 34px;
    line-height: 48px;
    h2{
      text-align: center;
      font-size: 40px;
      margin-bottom: 20px;
    }
  }
</style>
