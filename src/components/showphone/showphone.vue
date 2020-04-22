<template>
  <van-popup :show="showPhone">
    <div class="valid-box">
      <div class="tip">
        <p>就诊病人及家属请仔细阅读</p>
        <span @click="openUserProt">《用户服务协议及隐私保护政策》</span><br>
        绑定手机号码并点击确定代表您完全同意本协议的全部内容。</div>
      <input v-model.lazy="phone"  type="number" placeholder='绑定手机号码'>
      <div style="display:flex;">
        <span style="background-color: #f1f1f1;color: #000" class="btn2" @click="showPhone=false">取消</span>
        <span class="btn2" @click="newUserValid">确定</span>
      </div>
    </div>
  </van-popup>
</template>

<script>
	export default {
		props: {

		},
		data() {
			return {
        phone:'',
        showPhone:true,
			}
		},
		methods:{
      openUserProt(){
        wx.navigateTo({url:'../register/user-prot/main',query:{from:'index'}})
      },
      async newUserValid() {
        if(!this.phone){
          this.$toast('请输入手机号码')
          return
        }else {
          if(!(/^1[3-9]\d{9}$/.test(this.phone))){
            wx.showToast({
              title: '电话号码格式错误',
              icon: 'none',
            })
            return
          }
        }
        let that = this
        if(!this.openId){
          this.$toast('openId为空，请重新登录')
          return
        }
        wx.showModal({
          title:'确认提示',
          content: '请再次确认您的手机号码',
          success (res) {
            if (res.confirm) {
              let params ={
                openId:that.openId,
                phone:that.phone
              }
              console.log(params);
              that.$fly.request({
                method:'post',
                url:"user/valid",
                params
              }).then(res =>{
                if(res.code === 200) {
                  that.userInfo = res.data.userInfo
                  let token = res.data.token
                  wx.setStorageSync('token',token);
                  wx.setStorageSync('userInfo', that.userInfo);
                  wx.setStorageSync('userId', that.userInfo.id);
                  wx.setStorageSync('phone', that.userInfo.username);
                  that.getNurseList({serviceType:1,size:50})
                  that.getHealthList({userId:that.userInfo.id})
                  that.showPhone =false
                  setTimeout(()=>{
                    that.$toast('手机号已绑定成功')
                  },500)
                }else {
                  that.$toast(res.message)
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
		}
	}
</script>
<style scoped>

</style>
<style lang="less" scoped>
  .valid-box{
    width:650px;
    /*height: 500px;*/
    background:rgba(255,255,255,1);
    border-radius:10px;
    color: #333;
    font-size: 38px;
    overflow: hidden;
    .tip{
      padding: 25px 40px;
      /*height: 170px;*/
      box-sizing: border-box;
      line-height: 60px;
      p{
        padding-left: 25px;
        font-size: 38px;
      }
      span{
        color: #47BDC3;
      }
    }
    input{
      height: 120px;
      line-height: 120px;
      padding-left: 30px;
      width:100%;
      border: 1px solid #C7C7C7;
      background: #fff ;
      font-size:38px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      border-radius: 8px;
      overflow: hidden;
      color: #000000;
    }
    .btn2{
      text-align: center;
      border:none;
      width: 100%;
      height:110px;
      line-height: 110px;
      background:#47BDC3;
      outline: none;
      font-size:38px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
  }
</style>
