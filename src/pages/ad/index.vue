<template>
  <div class="main">
    <img  @click="anQue" src="/static/img/anw.jpg" alt="" style="width: 90%;">
    <p class="tishi">没有登记将无法正常看医生</p>
  </div>

</template>

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
    },
		onShow() {
		},
		methods: {
      anQue(){
        this.$router.push({path:'/pages/question/main'})
      },
		},
	}
</script>


<style lang="less" scoped>
  .main{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    img{
      display: block;
    }
    .tishi{
      margin-top: 50px;
      color: #ff0911;
      font-size: 56px;
      text-align: center;
      font-weight: 700;
    }
  }

</style>
