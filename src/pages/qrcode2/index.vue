<template>
  <div>
    <van-popup :show="showQrcode" @close="onClose">
      <div class="null" v-if="nullQr">
        您尚未填写入院承诺书
      </div>
      <div class="change-box" v-else>
        <img class="qr-code" :src="Qrcode" alt=" ">
        <p style="margin: 6px 0;font-size: 18px">入院病人健康码</p>
        <p  style="padding:2px 0 5px;color: red;font-size: 18px">申报日期：{{addTime}}</p>
      </div>

    </van-popup>
  </div>

</template>

<script>
	export default {
		data() {
			return {
        Qrcode:null,
        addTime:null,
        showQrcode:true,
        isRed:false,
        nullQr:false,
        userId:wx.getStorageSync('userId')
			}
		},
		onShow() {
      this.userId = wx.getStorageSync('userId')
      if(this.userId){
        this.getQrcode()
      }

		},
		methods: {

      onClose(){
        wx.navigateBack()
      },
      async getQrcode() {
        this.nullQr =false
        let params = {
          userId:this.userId,
          size:1
        }
        await this.$fly.request({
          methods:'get',
          url:"ncpQr1/list",
          params
        }).then(res =>{
          if(res.code === 200) {
            if(res.data.list.length>0){
              this.Qrcode = res.data.list[0].ncpQr
              this.addTime = res.data.list[0].addTime.substring(0,10)
              console.log(this.addTime);
              if(res.data.list[0].result===1){
                this.isRed = true
              }else {
                this.isRed = false
              }
            }else {
              this.nullQr =true
              console.log('空');
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
  .null{
    width: 516px;
    height: 200px;
    font-size: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
