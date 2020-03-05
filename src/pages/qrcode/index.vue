<template>
  <div>
    <van-popup :show="showQrcode" @close="onClose">
      <div class="change-box change-box2">
        <img class="qr-code" :src="Qrcode" alt=" ">
<!--        <p v-if="isRed">请到发热门诊挂号就诊</p>-->
<!--        <p v-else>请到普通门诊挂号就诊</p>-->
      </div>
    </van-popup>
  </div>

</template>

<script>
	export default {
		data() {
			return {
        Qrcode:null,
        showQrcode:true,
        isRed:false
			}
		},
    beforeMount() {
      this.userId = wx.getStorageSync('userId')
      this.getQrcode()
    },
		onShow() {
		},
		methods: {
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
            }
          }}).catch((req)=>{
          console.log(req)
        })
      },
		},
	}
</script>


<style lang="less" scoped>
  .change-box2{
    width: 516px;
    height: 516px;
    padding:0;
  }
  .qr-code{
    width: 100%;
    height: 100%;
    background-color: #47BDC3;
  }
</style>
