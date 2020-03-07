<template>
  <div>
    <van-popup :show="showQrcode" @close="onClose">
      <div class="change-box">
        <img class="qr-code" :src="Qrcode" alt=" ">
        <p v-if="isRed">请到发热门诊挂号就诊</p>
        <p v-else>请到普通门诊挂号就诊</p>
        <p v-if="ifCommit" style="padding: 4px;font-weight:500;">健康码有效</p>
        <p v-else style="color: red;font-weight: 500;font-size: 16px;padding: 4px">健康码无效,请重新填写登记表</p>
      </div>
    </van-popup>
  </div>

</template>`

<script>
	export default {
		data() {
			return {
        Qrcode:null,
        showQrcode:true,
        isRed:false,
        ifCommit:false
			}
		},
    beforeMount() {
      this.userId = wx.getStorageSync('userId')
      this.getQrcode()
      this.getIfCommit({userId:this.userId})
    },
		onShow() {
		},
		methods: {
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
            }else {
              this.ifCommit =false
            }
          }
        })
      },
      onClose(){
        // this.showQrcode =false
        wx.navigateBack()
      },
      async getQrcode() {
        let params = {
          userId:this.userId,
          size:2
        }
        await this.$fly.request({
          methods:'get',
          url:"ncpQr/list",
          params
        }).then(res =>{
          if(res.code === 200) {
            if(res.data.list.length>0){
              this.Qrcode = res.data.list[0].ncpQr
              if(res.data.list[0].result===1){
                this.isRed = true
              }else {
                this.isRed = false
              }
            }
          }}).catch((req)=>{
          console.log(req)
        })
      },
		},
	}
</script>


<style lang="less" scoped>
  .change-box{
    width: 516px;
    padding:0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .qr-code{
      height: 516px;
      width: 100%;
    }
  }
</style>
