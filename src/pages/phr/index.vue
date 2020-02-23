<template>
	<div class="main">
<!--    <div  class="head" @click="goBack">-->
<!--      <van-icon name="arrow-left" size="25px" custom-style="margin-right:10px"/>返回-->
<!--    </div>-->
		<h2 style="padding: 20px">健康档案</h2>
		<div class="content">
				<div class="body-one">
					<div class="content-card">
						<div class="input-box" @click="showSelect('转介来源')">
							<span> <em>*</em>转介来源：</span>
							<input  v-model="healthData.sourceOfReferral" :value="healthData.zjName"  placeholder="转介来源" disabled />
						</div>
						<div class="input-box" @click="showSelect('隶属区域')">
							<span> <em>*</em>隶属区域：</span>
							<input   v-model="healthData.subordinateArea" placeholder="隶属区域" disabled />
						</div>
						<div class="input-box" @click="showSelect('居住方式')">
							<span> <em>*</em>居住方式：</span>
							<input   v-model="healthData.living" :value="healthData.zjfsName" placeholder="居住方式" disabled />
						</div>
					</div>
					<div class="content-card">
							<div class="input-box" @click="openMyData('name')">
								<span> <em>*</em>姓名：</span>
								<input  v-model="healthData.name" placeholder="请输入姓名" disabled />
							</div>
							<div class="input-box" @click="openMyData('gender')">
								<span> <em>*</em>性别：</span>
								<input  v-model="healthData.gender" placeholder="请选择性别" disabled />
							</div>

							<div class="input-box" @click="showPopFn">
								<span> <em>*</em>出生年月：</span>
								<input  v-model="healthData.birthday" placeholder="出生年月" disabled style="flex: 1;"/>
								<span style="text-align: right;">年龄:{{healthData.age?healthData.age:0}}</span>
							</div>
						<div class="input-box" @click="showSelect('文化')">
							<span> <em>*</em>文化：</span>
							<input  v-model="healthData.educationLevel" :value="healthData.whName"  placeholder="请选择文化" disabled />
						</div>
						<div class="input-box" @click="showSelect('籍贯')">
							<span> 籍贯：</span>
							<input  v-model="healthData.nativePlace"   placeholder="请选择籍贯" disabled />
						</div>
						<div class="input-box" @click="showSelect('民族')">
							<span> 民族：</span>
							<input  v-model="healthData.nationality"   placeholder="请选择民族" disabled />
						</div>

						<div class="input-box" >
							<span> 职业：</span>
							<input  v-model="healthData.occupation"  placeholder="请输入职业"  />
						</div>
						<div class="input-box" @click="showSelect('婚姻状况')">
							<span> <em>*</em>婚姻状况：</span>
							<input  v-model="healthData.maritalStatus" :value="healthData.fyzkName"  placeholder="请选择婚姻状况" disabled />
						</div>
						<div class="input-box" @click="showSelect('医疗付款方式')">
							<span> <em>*</em>医疗付款方式：</span>
							<input  v-model="healthData.medicalPaymentMethod" :value="healthData.ylfkName"  placeholder="请选择医疗付款方式" disabled />
						</div>

						<div class="input-box" @click="showSelect('现居住地')">
							<span> 现居住地：</span>
							<input  v-model="healthData.residence"   placeholder="请选择现居住地" disabled />
						</div>
						<div class="input-box">
							<span> 工作单位：</span>
							<input  v-model="healthData.workplace"   placeholder="工作单位"  />
<!--              <textarea class="address"  rows="3" v-model="healthData.workplace"   placeholder="工作单位"></textarea>-->
						</div>
						<div class="input-box">
							<span> 单位联系人：</span>
							<input  v-model="healthData.workplaceContact"   placeholder="单位联系人"  />
						</div>
						<div class="input-box">
							<span> 单位联系电话：</span>
							<input  v-model="healthData.workplaceContactPhone"   placeholder="单位联系电话"  />
						</div>

					</div>
					<div class="content-card" style="border: none">
						<div class="input-box">
							<span> <em>*</em>住所地址：</span>
							<input  v-model="healthData.residenceAddress"   placeholder="住所地址"  />
<!--              <textarea class="address"  rows="3" v-model="healthData.residenceAddress"   placeholder="住所地址"></textarea>-->
						</div>
						<div class="input-box">
							<span> 住所联系人：</span>
							<input  v-model="healthData.residenceContact"   placeholder="住所联系人"  />
						</div>
						<div class="input-box"  @click="showSelect('关系')">
							<span> 关系：</span>
							<input  v-model="healthData.relation"  :value="healthData.gxName"  placeholder="请选择关系" disabled/>
						</div>
						<div class="input-box">
							<span> 联系人电话：</span>
							<input  v-model="healthData.residenceContactPhone"   placeholder="联系人电话"  maxlength="13"/>
						</div>
					</div>
				</div>
				<div class="line"></div>
				<div class="body-two">
					<h2>基本健康状况：</h2>
					<div class="card">
						<h4><span class="tip">1</span>心脑血管疾病风险筛查<span>(多选)</span>：</h4>
						<van-checkbox-group :value="healthData.cerebralApoplexyFactor" @change="onChange" >
							<van-checkbox :name="item" v-for="(item,index) in cerebralApoplexyFactorList" :key="index" checked-color="#07c160" >{{item}}</van-checkbox>
						</van-checkbox-group>
					</div>

					<div class="card">
						<h4><span class="tip">2</span>当前血压水平(mmHg)</h4>
						<div style="display: flex;justify-content: space-between">
							<div style="display: flex; width: 45%">
								<span >舒张压<strong class="dw">(mmHg)</strong>
								</span>
								<input  class="diastolicBloodPressur" :maxlength="4"  v-model="healthData.diastolicBloodPressur" placeholder=" "  />
							</div>
							<div style="display: flex;width: 45%" >
								<span >收缩压<strong class="dw">(mmHg)</strong></span>
								<input class="systolicBloodPressur"  :maxlength="4" v-model="healthData.systolicBloodPressur" placeholder=" "  />
							</div>
						</div>
						<div class="tip2">
							<span><em>*</em>正在服用降压药：</span>
							<van-radio-group :value="healthData.takeAntihypertensiveDrugs" @change="onChange2"  style="display: flex">
								<van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
							</van-radio-group>
						</div>
					</div>
					<div class="card">
						<span class="tip">3</span><em style="color: red;display: inline-block">*</em>糖尿病：
						<van-radio-group :value="healthData.diabetesMellitus" @change="onChange3"  style="display: flex">
							<van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
						</van-radio-group>
					</div>

					<div class="card">
						<span class="tip">4</span>血脂水平：
						<div class="input-box">
							<span> 甘油三脂(TC)：</span>
							<input  v-model="healthData.triglyceride"  />
							<strong class="dw">mmol/1</strong>
						</div>
						<div class="input-box">
							<span> 高密度脂蛋白胆固醇(HDL-C)：</span>
							<input  v-model="healthData.highDensityLipteinCholesterol"  type="number" :maxlength="5" />
							<strong class="dw">mmol/1</strong>
						</div>
						<div class="input-box">
							<span> 低密度脂蛋白胆固醇(LDL-C)：</span>
							<input  v-model="healthData.lowDensityLipteinCholesterol" type="number" :maxlength="5"  />
							<strong class="dw">mmol/1</strong>
						</div>
					</div>

					<div class="card">
						<span class="tip">5</span><em style="color: red;display: inline-block">*</em>体育锻炼很少或轻体力劳动者：
						<van-radio-group :value="healthData.littlePhysicalExercise" @change="onChange5"  style="display: flex">
							<van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
						</van-radio-group>
						<p class="explain">{{explain[0]}}</p>
					</div>
					<div class="card">
						<span class="tip">6	</span><em style="color: red;display: inline-block">*</em>身高、体重
						<div class="input-box">
							身高：
							<input  type="number" :maxlength="6" v-model="healthData.height"   @blur="validateNum('身高')"/>
							<strong class="dw">kg</strong>
						</div>
						<div class="input-box">
							体重：
							<input  v-model="healthData.weight"  type="number" :maxlength="5" @blur="validateNum('体重')"/>
							<strong class="dw">kg</strong>
						</div>
					</div>

					<div class="card">
						<span class="tip">7</span><em style="color: red;display: inline-block">*</em>现在是否吸烟：
						<van-radio-group :value="healthData.smokingStatus" @change="onChange7"  style="display: flex">
							<van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
						</van-radio-group>
						<div v-if="healthData.smokingStatus==='1'">
							<p class="explain">每天吸烟≥30支</p>
							<van-radio-group :value="healthData.heavySmoking" @change="onChange8"  style="display: flex">
								<van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
							</van-radio-group>
						</div>
					</div>
					<div class="card">
						<span class="tip">8</span><em style="color: red;display: inline-block">*</em>心脑血管疾病家族史：
						<van-radio-group :value="healthData.hereditaryDisease" @change="onChange9"  style="display: flex">
							<van-radio  v-for="(item,index) in radio" :name="item.label" :key="item" checked-color="#07c160">{{item.name}}</van-radio>
						</van-radio-group>
						<p class="explain">{{explain[2]}}</p>
					</div>
				</div>
		</div>
		<div  v-if="isEdit" class="btn" @click="saveData">保存修改</div>
		<div v-else class="btn" @click="saveData">保存</div>

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

		<van-popup :show="showA" position="bottom" :style="{ height: '40%' }">
			<van-picker :columns="listName"  @cancel="onCancel" @confirm="onConfirm"   value-key="itemName"  default-index="id" show-toolbar/>
		</van-popup>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				subordinateAreaList:[],//隶属区域列表
				showType:null,
				showA:false,
				listName:[],
				healthId:'', //用户档案ID
				minDate: new Date(1900,0,1).getTime(),
				maxDate: new Date().getTime(),
				currentDate: new Date(1950,0,1).getTime(),
				show:false,
				isEdit:false,
				birthday:'', //生日
				living:'', //选中的居住方式
				sourceList:[], //转介来源
				liveList:[
					{
						itemName:'独居',
						key:0
					},
					{
						itemName:'只与配偶同住',
						key:1
					},
					{
						itemName:'与家人同住',
						key:2
					},
				],
				suboAreaList:[],
				// 性别
				gender:[
					{
						itemName:'男',
						key:1
					},
					{
						itemName:'女',
						key:2
					},
				],
				// 学历
				educationLevelArr:[
					{
						itemName:'小学',
						key:1
					},
					{
						itemName:'初中',
						key:2
					},
					{
						itemName:'中专',
						key:3
					},
					{
						itemName:'大专',
						key:4
					},
					{
						itemName:'大学本科',
						key:5
					},
					{
						itemName:'研究生',
						key:6
					},
					{
						itemName:'研究生以上',
						key:7
					},
				],
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
				// 婚姻状况
				maritalStatusList:[
					{
						itemName:'未婚',
						key:0
					},
					{
						itemName:'已婚',
						key:1
					},
					{
						itemName:'离异',
						key:2
					},
					{
						itemName:'丧偶',
						key:3
					},
				],
				// 医疗付款方式列表
				payList:[],
				// 现居住地
				resiList:[],
				// 籍贯
				nativePlaceList:[],
				// 民族列表
				nationalityList:[],
				healthData:{
					birthday:null,
					name:null,
          cerebralApoplexyFactor:[],
          // takeAntihypertensiveDrugs:null,
          // diabetesMellitus:null,
          // littlePhysicalExercise:null,
          // smokingStatus:null,
          // heavySmoking:null,
          // hereditaryDisease:null,
				},
				// 脑卒中因素
				cerebralApoplexyFactorList:['既往有脑卒中','既往有短暂性脑缺血发作','冠心病'],
				radio:[
					{label: 0, name: '否'},
					{label: 1, name: '是'},
				],
				// 内容说明
				explain:[
					'（次数<3次/周且<30分钟/次：经常参与工农业劳动视为有体育锻炼）',
					'（BMI：12kg/m2）',
					'（指父母、兄弟姐妹中有人患有心肌梗死或脑卒中）'
				],
			}
		},
		beforeMount(){
			this.userId = wx.getStorageSync('userId')
			this.init()
			this.getHealthRecordList()

		},
		mounted(){
			setTimeout(()=>{
				this.getUserDate({userId:this.userId})
			},300)
		},
    // onShow() { //返回显示页面状态函数
    //   this.getHealthRecordList()
    // },
		methods: {
      onChange (event) {
        this.healthData.cerebralApoplexyFactor = event.mp.detail
      },
			onChange2 (event) {
				this.healthData.takeAntihypertensiveDrugs = event.mp.detail
      },
			onChange3 (event) {
				this.healthData.diabetesMellitus = event.mp.detail
			},
			onChange5 (event) {
				this.healthData.littlePhysicalExercise = event.mp.detail
			},
			onChange7 (event) {
				this.healthData.smokingStatus = event.mp.detail
			},
			onChange8 (event) {
				this.healthData.heavySmoking = event.mp.detail
			},
			onChange9 (event) {
				this.healthData.hereditaryDisease = event.mp.detail
			},
			showSelect(type){
				this.listName = []
				this.showType =type
				console.log(this.showType);
				if(type==='隶属区域'){
					this.listName=this.subordinateAreaList
				}else if(type==='转介来源'){
					this.listName = this.sourceList
				}else if(type==='居住方式'){
					this.listName=this.liveList
				}else if(type==='文化'){
					this.listName=this.educationLevelArr
				}else if(type==='籍贯'){
					this.listName=	this.nativePlaceList
				}else if(type==='民族'){
					this.listName=	this.nationalityList
				}else if(type==='婚姻状况'){
					this.listName=	this.maritalStatusList
				}else if(type==='医疗付款方式'){
					this.listName=	this.payList
				}else if(type==='现居住地'){
					this.listName=	this.resiList
				}else if(type==='关系'){
					this.listName=	this.relationList
				}
				this.showA = true
			},
			onConfirm(event) {
				const { picker, value, index } = event.mp.detail;
				console.log(value);
				if(this.showType==='转介来源'){
				    this.healthData.sourceOfReferral = value.id
				    this.healthData.zjName = value.itemName
			    }else if(this.showType==='隶属区域'){
					this.healthData.subordinateArea = value.itemName
				}else if(this.showType==='居住方式'){
          this.healthData.zjfsName = value.itemName
					this.healthData.living = value.key
				}else if(this.showType==='文化'){
					this.healthData.whName = value.itemName
					this.healthData.educationLevel = value.key
				}else if(this.showType==='籍贯'){
					this.healthData.nativePlace = value.name
				}else if(this.showType==='民族'){
					this.healthData.nationality = value.itemName
				}else if(this.showType==='婚姻状况'){
					this.healthData.maritalStatus = value.key
					this.healthData.fyzkName = value.itemName
				}else if(this.showType==='医疗付款方式'){
					this.healthData.medicalPaymentMethod = value.id
					this.healthData.ylfkName = value.itemName
				}else if(this.showType==='关系'){
					this.healthData.relation = value.key
					this.healthData.gxName = value.itemName
				}else if(this.showType==='现居住地'){
          this.healthData.residence = value.itemName
        }
				setTimeout(()=>{
					this.showA = false
				})

			},
			onCancel(){
				this.showA = false
			},
			//初始化，获取数据
			init(){
				this.getNation() // 民族
				this.getDistrict() // 隶属区域
				this.getProvince()// 籍贯
				this.getSourceList()// 转介来源
				this.getPayList()// 医疗付款方式
				this.getResidenceList()// 现居住地列表
				this.getDay(0,'-') //当前时间
			},
			//完善个人信息
			openMyData(type){
				let that = this
        let msg ='您的个人中心尚未完善，是否现在完善？'
        if(this.isEdit){
          msg ='此信息需前往个人中心修改，是否现在去修改？'
        }
				wx.showModal({
					title:'提示',
					content: msg,
					success (res) {
						if (res.confirm) {
							that.$router.push({path:'/pages/my/infor/main'})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			saveData(){
				if(this.isEdit){
					this.editHealthRecord()
				}else {
					this.addHealthRecord()
				}
			},
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
							this.isEdit = true
							this.healthData=res.data.list[0]
							this.sourceList.forEach((item,index)=>{
								if(item.id===this.healthData.sourceOfReferral){
									this.healthData.zjName=item.itemName
								}
							})
							this.liveList.forEach((item)=>{
								if(item.key===this.healthData.living){
									this.healthData.zjfsName=item.itemName
								}
							})
							this.maritalStatusList.forEach((item,index)=>{
								if(item.key===this.healthData.maritalStatus){
									this.healthData.fyzkName=item.itemName
								}
							})
							this.payList.forEach((item,index)=>{
								if(item.id===this.healthData.medicalPaymentMethod){
									this.healthData.ylfkName=item.itemName
								}
							})
							this.payList.forEach((item,index)=>{
								if(item.id===this.healthData.medicalPaymentMethod){
									this.healthData.ylfkName=item.itemName
								}
							})
							this.educationLevelArr.forEach((item,index)=>{
								if(item.key===this.healthData.educationLevel){
									this.healthData.whName=item.itemName
								}
							})
							this.relationList.forEach((item,index)=>{
								if(item.key===this.healthData.relation){
									this.healthData.gxName=item.itemName
								}
							})
							for(let i in this.healthData){
								if(this.healthData[i]==='null')
									this.healthData[i]=null
							}
							this.getAge()
							this.healthId = this.healthData.id
							if(this.healthData.cerebralApoplexyFactor){
								this.healthData.cerebralApoplexyFactor = this.healthData.cerebralApoplexyFactor.split(',')
							}else {
								this.healthData.cerebralApoplexyFactor = []
							}
							//是否服用降压药
							this.healthData.takeAntihypertensiveDrugs =this.healthData.takeAntihypertensiveDrugs.toString()
							//是否糖尿病
							this.healthData.diabetesMellitus =this.healthData.diabetesMellitus.toString()
							//是否经常体育锻炼
							this.healthData.littlePhysicalExercise =this.healthData.littlePhysicalExercise.toString()
							//是否吸烟
							this.healthData.smokingStatus =this.healthData.smokingStatus.toString()
							//是否重度吸烟
							if(this.healthData.heavySmoking){
								this.healthData.heavySmoking =this.healthData.heavySmoking.toString()
							}
							//是否脑心血管
							this.healthData.hereditaryDisease =this.healthData.hereditaryDisease.toString()
							//男女判断
							if(this.healthData.gender===1){
								this.healthData.gender='男'
							}else {
								this.healthData.gender='女'
							}

              if(this.healthData.systolicBloodPressur===0){
								this.healthData.systolicBloodPressur = ''
							}
							if(this.healthData.diastolicBloodPressur===0){
								this.healthData.diastolicBloodPressur = ''
							}
							if(this.healthData.triglyceride===0){
								this.healthData.triglyceride = ''
							}
							if(this.healthData.highDensityLipteinCholesterol===0){
								this.healthData.highDensityLipteinCholesterol = ''
							}
							if(this.healthData.lowDensityLipteinCholesterol===0){
								this.healthData.lowDensityLipteinCholesterol = ''
							}
						}else {
							console.log('无健康档案')
						}
					}}).catch((req)=>{
					console.log(req)
				})
				console.log(this.isEdit);
			},
			//编辑健康档案
			async editHealthRecord(){
				let params = {
					// 必填项
					id:this.healthData.id,
					userId:this.userId,
					name :this.healthData.name,
					// gender:this.healthData.gender ,
					living:parseInt(this.healthData.living) ,
					birthday:this.healthData.birthday ,
					educationLevel:parseInt(this.healthData.educationLevel) ,
					residenceAddress:this.healthData.residenceAddress,
					sourceOfReferral:parseInt(this.healthData.sourceOfReferral) ,
					subordinateArea:this.healthData.subordinateArea  ,
					maritalStatus:parseInt(this.healthData.maritalStatus),
					medicalPaymentMethod:parseInt(this.healthData.medicalPaymentMethod),
					smokingStatus:parseInt(this.healthData.smokingStatus),
					hereditaryDisease:parseInt(this.healthData.hereditaryDisease),
					takeAntihypertensiveDrugs :parseInt(this.healthData.takeAntihypertensiveDrugs),
					diabetesMellitus :parseInt(this.healthData.diabetesMellitus),
					littlePhysicalExercise:parseInt(this.healthData.littlePhysicalExercise),
					height:this.healthData.height,
					weight :this.healthData.weight ,
				}
				// 非必填
				if(this.healthData.relation ){
					params.relation = this.healthData.relation
				}
				if(this.healthData.residence){
					params.residence = this.healthData.residence
				}
				if(this.healthData.residenceContact){ //住所联系人
					params.residenceContact = this.healthData.residenceContact
				}else {
					params.residenceContact = null
				}
				if(this.healthData.residenceContactPhone){ //住所联系人电话
					params.residenceContactPhone = this.healthData.residenceContactPhone
				}else {
					params.residenceContactPhone=null
				}
				if(this.healthData.workplace){ //工作地址
					params.workplace = this.healthData.workplace
				}else {
					params.workplace = null
				}
				if(this.healthData.workplaceContact){ //单位联系人
					params.workplaceContact = this.healthData.workplaceContact
				}else {
					params.workplaceContact=null
				}
				if(this.healthData.workplaceContactPhone){ //单位联系电话
					params.workplaceContactPhone = this.healthData.workplaceContactPhone
				}else {
					params.workplaceContactPhone = null
				}
				if(this.healthData.nativePlace){ //籍贯
					params.nativePlace = this.healthData.nativePlace
				}
				if(this.healthData.nationality){ //民族
					params.nationality = this.healthData.nationality
				}
				if(this.healthData.occupation){ //职业
					params.occupation = this.healthData.occupation
				}else {
					params.occupation = null
				}
				// 心脑血管疾病风险筛查编辑：
				if(this.healthData.cerebralApoplexyFactor&&this.healthData.cerebralApoplexyFactor!==''&&this.healthData.cerebralApoplexyFactor.length!==0){
					params.cerebralApoplexyFactor = this.healthData.cerebralApoplexyFactor.toString()
				}else {
					params.cerebralApoplexyFactor = null
				}
				console.log(this.healthData.cerebralApoplexyFactor);
				if(this.healthData.systolicBloodPressur){   //收缩压(mmHg)
					params.systolicBloodPressur = this.healthData.systolicBloodPressur
				}else {
					params.systolicBloodPressur =0
				}
				if(this.healthData.diastolicBloodPressur){ //舒张压(mmHg)
					params.diastolicBloodPressur=this.healthData.diastolicBloodPressur
				}else {
					params.diastolicBloodPressur = 0
				}
				if(this.healthData.triglyceride){ //甘油三酯含量(TC)
					if(this.healthData.triglyceride>=1000){
						this.healthData.triglyceride =''
						this.$toast('请输入正确的甘油三酯含量，列如：1.56')
						return
					}
					params.triglyceride=this.healthData.triglyceride
				}else {
					params.triglyceride = 0
				}
				if(this.healthData.highDensityLipteinCholesterol){ //高密度脂蛋白胆固醇(HDL-C)
					if(this.healthData.highDensityLipteinCholesterol>=1000){
						this.healthData.highDensityLipteinCholesterol =''
						this.$toast('请输入正确的高密度脂蛋白胆固醇，列如：1.56')
						return
					}
					params.highDensityLipteinCholesterol=this.healthData.highDensityLipteinCholesterol
				}else {
					params.highDensityLipteinCholesterol =0
				}
				if(this.healthData.lowDensityLipteinCholesterol){ //低密度脂蛋白胆固醇(LDL-C)
					if(this.healthData.lowDensityLipteinCholesterol>=1000){
						this.healthData.lowDensityLipteinCholesterol=''
						this.$toast('请输入正确的低密度脂蛋白胆固醇，列如：0.56')
						return
					}
					params.lowDensityLipteinCholesterol=this.healthData.lowDensityLipteinCholesterol
				}else {
					params.lowDensityLipteinCholesterol =0
				}
				if(this.healthData.heavySmoking!==undefined&&this.healthData.heavySmoking!==null&&this.healthData.heavySmoking!==''){
					params.heavySmoking = parseInt(this.healthData.heavySmoking)  //重度吸烟
				}
				// if(this.healthData.hereditaryDisease!==undefined&&this.healthData.hereditaryDisease!==null&&this.healthData.hereditaryDisease!==''){
				// 	params.hereditaryDisease = this.healthData.hereditaryDisease //心脑血管家族遗传病史
				// }
				console.log(params);
				if(this.healthData.sourceOfReferral===undefined){
					this.$toast('请选择转介来源')
					return
				}
				if(this.healthData.subordinateArea===undefined){
					this.$toast('请选择隶属区域')
					return
				}
				if(this.healthData.living===undefined){
					this.$toast('请选择居住方式')
					return
				}
				if(!this.healthData.name){
					this.$toast('请在个人中心完善姓名信息')
					return
				}
				if(this.healthData.gender===undefined){
					this.$toast('请选择性别')
					return
				}
				if(!this.healthData.birthday){
					this.$toast('出生年月不能为空')
					return
				}
				if(this.healthData.educationLevel===undefined){
					this.$toast('请选择文化程度')
					return
				}
				if(this.healthData.maritalStatus===undefined){
					this.$toast('请选择婚姻状况')
					return
				}
				if(this.healthData.medicalPaymentMethod===undefined){
					this.$toast('请选择医疗付款方式')
					return
				}
				if(!this.healthData.residenceAddress ){
					this.$toast('住所地址不能为空')
					return
				}
				if(this.healthData.takeAntihypertensiveDrugs===undefined){
					this.$toast('请选择是否正在服用降压药')
					return
				}
				if(this.healthData.diabetesMellitus===undefined){
					this.$toast('请选择是否糖尿病')
					return
				}
				if(this.healthData.littlePhysicalExercise===undefined){
					this.$toast('请选择体育锻炼情况')
					return
				}
				if(!this.healthData.height){
					this.$toast('身高不能为空')
					return
				}else if(this.healthData.height<0.5||this.healthData.height>3){
					this.$toast('请输入正确的身高（0.5~3）米')
					return
				}
				if(!this.healthData.weight ){
					this.$toast('体重不能为空')
					return
				}else if(this.healthData.weight<10||this.healthData.weight>300){
					this.$toast('请输入正确的体重（10~300）kg')
					return
				}
				if(this.healthData.smokingStatus===undefined){
					this.$toast('请选择吸烟情况')
					return
				}
				if(this.healthData.hereditaryDisease===undefined){
					this.$toast('请选择是否有心脑血管家族遗传病史')
					return
				}
				if(!(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(this.healthData.name))){
					this.$toast('姓名不能包含特殊符号和空格')
					return
				}
				await this.$fly.request({
					method:'put',
					url:"userHealthRecord/update",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.$toast('保存成功')
						setTimeout(()=>{
							this.$router.back()
						},100)
					}else if(res.code === 400){
            this.$toast(res.message)
          }}).catch((req)=>{
					console.log(req)
					this.$toast(res.message)
				})
			},

			//新增健康档案
			async addHealthRecord(){
				let params = {
					// 必填项
					userId:this.userId,
					name :this.healthData.name,
					gender:this.healthData.gender==='男'?1:2,
					relation :this.healthData.relation,
          living:parseInt(this.healthData.living) ,
          birthday:this.healthData.birthday ,
          educationLevel:parseInt(this.healthData.educationLevel) ,
          residenceAddress:this.healthData.residenceAddress,
          sourceOfReferral:parseInt(this.healthData.sourceOfReferral) ,
          subordinateArea:this.healthData.subordinateArea  ,
          maritalStatus:parseInt(this.healthData.maritalStatus),
          medicalPaymentMethod:parseInt(this.healthData.medicalPaymentMethod),
          smokingStatus:parseInt(this.healthData.smokingStatus),
          hereditaryDisease:parseInt(this.healthData.hereditaryDisease),
          takeAntihypertensiveDrugs :parseInt(this.healthData.takeAntihypertensiveDrugs),
          diabetesMellitus :parseInt(this.healthData.diabetesMellitus),
          littlePhysicalExercise:parseInt(this.healthData.littlePhysicalExercise),
					height:this.healthData.height,
					weight :this.healthData.weight,
				}

				// 非必填
				if(this.healthData.relation){
					params.relation = this.healthData.relation
				}
				if(this.healthData.residence){
					params.residence = this.healthData.residence.toString()
				}
				if(this.healthData.residenceContact){
					params.residenceContact = this.healthData.residenceContact
				}
				if(this.healthData.residenceContactPhone){
					params.residenceContactPhone = this.healthData.residenceContactPhone
				}
				if(this.healthData.workplace){
					params.workplace = this.healthData.workplace
				}
				if(this.healthData.workplaceContact){
					params.workplaceContact = this.healthData.workplaceContact
				}
				if(this.healthData.workplaceContactPhone){
					params.workplaceContactPhone = this.healthData.workplaceContactPhone
				}
				if(this.healthData.nativePlace){ //籍贯
					params.nativePlace = this.healthData.nativePlace
				}
				if(this.healthData.nationality){ //民族
					params.nationality = this.healthData.nationality
				}
				if(this.healthData.occupation){ //职业
					params.occupation = this.healthData.occupation
				}
				// 心脑血管疾病风险筛查：
				if(this.healthData.cerebralApoplexyFactor&&this.healthData.cerebralApoplexyFactor!==''){
					params.cerebralApoplexyFactor = this.healthData.cerebralApoplexyFactor.toString()
				}
				if(this.healthData.systolicBloodPressur){
					params.systolicBloodPressur = this.healthData.systolicBloodPressur
				}
				if(this.healthData.diastolicBloodPressur){
					params.diastolicBloodPressur=this.healthData.diastolicBloodPressur
				}
				if(this.healthData.systolicBloodPressur){
					params.systolicBloodPressur=this.healthData.systolicBloodPressur
				}
				if(this.healthData.triglyceride){
					if(this.healthData.triglyceride>=1000){
						this.$toast('请输入正确的甘油三酯含量，列如：1.56')
						return
					}
					params.triglyceride=this.healthData.triglyceride
				}
				if(this.healthData.highDensityLipteinCholesterol){
					if(this.healthData.highDensityLipteinCholesterol>=1000){
						this.$toast('请输入正确的高密度脂蛋白胆固醇，列如：1.56')
						return
					}
					params.highDensityLipteinCholesterol=this.healthData.highDensityLipteinCholesterol
				}
				if(this.healthData.lowDensityLipteinCholesterol){
					if(this.healthData.lowDensityLipteinCholesterol>=1000){
						this.$toast('请输入正确的低密度脂蛋白胆固醇，列如：0.56')
						return
					}
					params.lowDensityLipteinCholesterol=this.healthData.lowDensityLipteinCholesterol
				}
				if(this.healthData.heavySmoking!==undefined&&this.healthData.heavySmoking!==null&&this.healthData.heavySmoking!==''){
          params.heavySmoking = parseInt(this.healthData.heavySmoking)  //重度吸烟
				}
				// if(this.healthData.hereditaryDisease!==undefined&&this.healthData.hereditaryDisease!==null&&this.healthData.hereditaryDisease!==''){
				// 	params.hereditaryDisease = this.healthData.hereditaryDisease //心脑血管家族遗传病史
				// }
				if(this.healthData.sourceOfReferral===undefined){
					this.$toast('请选择转介来源')
					return
				}
				if(this.healthData.subordinateArea===undefined){
					this.$toast('请选择隶属区域')
					return
				}
				if(this.healthData.living===undefined){
					this.$toast('请选择居住方式')
					return
				}
				if(!this.healthData.name){
					this.$toast('请在个人中心完善姓名')
					return
				}
				if(this.healthData.gender===undefined){
					this.$toast('请选择性别')
					return
				}
				if(!this.healthData.birthday){
					this.$toast('请在个人中心完善出生日期')
					return
				}
				if(this.healthData.educationLevel===undefined){
					this.$toast('请选择文化程度')
					return
				}
				if(this.healthData.maritalStatus===undefined){
					this.$toast('请选择婚姻状况')
					return
				}
				if(this.healthData.medicalPaymentMethod===undefined){
					this.$toast('请选择医疗付款方式')
					return
				}
				if(!this.healthData.residenceAddress){
					this.$toast('住所地址不能为空')
					return
				}
				if(this.healthData.takeAntihypertensiveDrugs===undefined){
					this.$toast('请选择是否正在服用降压药')
					return
				}
				if(this.healthData.diabetesMellitus===undefined){
					this.$toast('请选择是否糖尿病')
					return
				}
				if(this.healthData.littlePhysicalExercise===undefined){
					this.$toast('请选择体育锻炼情况')
					return
				}
				if(!this.healthData.height){
					this.$toast('身高不能为空')
					return
				}else if(this.healthData.height<0.5||this.healthData.height>3){
					this.$toast('请输入正确的身高（0.5~3）米')
					return
				}
				if(!this.healthData.weight ){
					this.$toast('体重不能为空')
					return
				}else if(this.healthData.weight<10||this.healthData.weight>300){
					this.$toast('请输入正确的体重（10~300）kg')
					return
				}
				if(this.healthData.smokingStatus===undefined){
					this.$toast('请选择吸烟情况')
					return
				}
				if(this.healthData.hereditaryDisease===undefined){
					this.$toast('请选择是否有心脑血管家族遗传病史')
					return
				}
				if(!(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(this.healthData.name))){
					this.$toast('姓名不能包含特殊符号和空格')
					return
				}
				console.log(params);
				await this.$fly.request({
					method:'post',
					url:"userHealthRecord/add",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.$toast('添加健康档案成功')
						setTimeout(()=>{
							this.$router.push({name:'首页'})
						},300)
					}else if(res.code === 500){
						this.$toast('服务器内部错误，请联系管理员')
					} else {
						this.$toast(res.message)
					}}).catch((req)=>{
					console.log(req)
				})
			},
			// 民族
			async getNation(){
				let params={
					size:60
				}
				await this.$fly.request({
					method:'get',
					url:"nationalityList/list",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.nationalityList=res.data.list
						this.nationalityList.forEach((i,index)=>{
							this.$set(this.nationalityList[index],'itemName',i.name)
						})
					}}).catch((req)=>{
					console.log(req)
				})
			},
			// 隶属区域
			async getDistrict(){
				let params={
					size:15
				}
				await this.$fly.request({
					method:'get',
					url:"subordinateAreaList/list",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.subordinateAreaList = res.data.list
					}}).catch((req)=>{
					console.log(req)
				})
			},
			// 籍贯
			async getProvince(){
				let params={
					size:50
				}
				await this.$fly.request({
					method:'get',
					url:"province/list",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.nativePlaceList=res.data.list
						this.nativePlaceList.forEach((i,index)=>{
							this.$set(this.nativePlaceList[index],'itemName',i.name)
						})
					}}).catch((req)=>{
					console.log(req)
				})
			},
			// 转介来源
			async getSourceList(){
				let params={
					size:15
				}
				await this.$fly.request({
					method:'get',
					url:"sourceOfReferralList/list",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.sourceList = res.data.list
					}}).catch((req)=>{
					console.log(req)
				})
			},
			// 医疗付款方式
			async getPayList(){
				await this.$fly.request({
					method:'get',
					url:"medicalPaymentMethodList/list",
				}).then(res =>{
					if(res.code === 200) {
						this.payList = res.data.list
					}}).catch((req)=>{
					console.log(req)
				})
			},
			// 现居住地列表
			async getResidenceList(){
				let params={
					size:15
				}
				await this.$fly.request({
					method:'get',
					url:"residenceList/list",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.resiList = res.data.list
					}}).catch((req)=>{
					console.log(req)
				})
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
			showPopFn() {
				this.show = true;
				this.currentDate = 	this.healthData.birthday?new Date(this.healthData.birthday.replace(/-/g,",")).getTime():new Date(1950,0,1).getTime()
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
			//获取个人信息
			async getUserDate(params){
				await this.$fly.request({
					method:'get',
					url:"user/findById",
					params
				}).then(res =>{
					if(res.code === 200) {
						this.healthData.name = res.data.name?res.data.name:''
						if(res.data.gender===1){
							this.healthData.gender='男'
						}else {
							this.healthData.gender='女'
						}
						if(!this.healthData.residenceContactPhone||this.healthData.residenceContactPhone==='null'){
							this.healthData.residenceContactPhone = res.data.username
						}
					}}).catch((req)=>{
					console.log(req)
				})
			},

			validateNum(type){
				let height = this.healthData.height
				let weight = this.healthData.weight
				if(type==='身高'){
					if(height<0.5||height>3){
						this.healthData.height = ''
						this.$toast('请输入正确的身高（0.5~3）米')
					}
				}else if(type==='体重'){
					if(weight<10||weight>300){
						this.healthData.weight = ''
						this.$toast('请输入正确的体重（10~300）kg')
					}
				}
			}
		}
	}
</script>

<style scoped>
	.content>>>._van-radio-group{
		margin: 8px 0 5px;
	}
	.content>>>._van-radio{
		margin-right: 40px;
	}
	.content>>>._van-checkbox{
		margin: 20px;
	}
	.content>>>._van-checkbox-group{
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
		}
		.head-bar{
			width: 100%;
			height:90px;
			line-height:90px;
			background:rgba(245,245,245,1);
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			font-size:28px;
			z-index: 50;
			padding: 0 70px;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(51,51,51,1);
			span{
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 20px;
				i{
					display: flex;
					height: 100%;
					align-items: center;
				}
			}
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
			.content-card{
				width: 100%;
				padding: 21px 0;
				border-bottom: 2px solid #DEDEDE;
				.input-box{
					display: flex;
					align-items: center;
					margin: 30px 0;
					span{
						flex: 1;
						display: flex;
						em{
							color: red;
						}
					}
					input{
						border: 1px solid #ccc;
						flex: 2;
						border-radius: 8px;
						height: 60px;
						line-height: 60px;
						padding-left: 10px;
					}
				}
        .address{
          height: 120px;
          border: 1px solid #ccc;
          flex: 2;
          border-radius: 8px;
          padding: 5px 8px;
        }
			}
		}
		.line{
			height: 22px;
			background-color: #F7F7F7;
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
			padding:20px 32px 2px;
		}
		.body-two{
			background:rgba(255,255,255,1);
			border-radius:10px;
			transition: all .3s;
			padding:40px 32px 5px;
			.card{
				margin: 50px 0;
				.tip{
					margin: 20px 20px 20px 0;
				}
			}
			.input-box{
				display: flex;
				align-items: center;
				margin: 20px 0;
				span{
					flex: 1;
					display: flex;
					em{
						color: red;
					}
				}
				input{
					border: 1px solid #ccc;
					flex: 1;
					border-radius:8px;
					height: 60px;
					line-height: 60px;
					padding-left: 10px;
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
		.dw{
			font-size: 26px;
			color: #969696;
		}
	}
</style>
