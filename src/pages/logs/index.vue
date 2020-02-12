<template>
  <div>
    <van-tabbar :active="active" @change="onChange">
      <van-tabbar-item>
        <image
          mode="aspectFit"
          slot="icon"
          src="/static/icon/hlicon1.png "
          style="width: 30px; height: 18px;"
        />
        <image
          slot="icon-active"
          src="/static/icon/hlicon2.png "
          mode="aspectFit"
          style="width: 30px; height: 18px;"
        />
        护理
      </van-tabbar-item>
      <van-tabbar-item>
        <image
          mode="aspectFit"
          slot="icon"
          src="/static/icon/order1.png "
          style="width: 30px; height: 18px;"
        />
        <image
          slot="icon-active"
          src="/static/icon/order2.png "
          mode="aspectFit"
          style="width: 30px; height: 18px;"
        />
        订单</van-tabbar-item>
      <van-tabbar-item :info=msgNum>
        <image
          mode="aspectFit"
          slot="icon"
          src="/static/icon/news1.png "
          style="width: 30px; height: 18px;"
        />
        <image
          slot="icon-active"
          src="/static/icon/news2.png "
          mode="aspectFit"
          style="width: 30px; height: 18px;"
        />
        消息</van-tabbar-item>
      <van-tabbar-item>
        <image
          mode="aspectFit"
          slot="icon"
          src="/static/icon/my1.png "
          style="width: 30px; height: 18px;"
        />
        <image
          slot="icon-active"
          src="/static/icon/my2.png "
          mode="aspectFit"
          style="width: 30px; height: 18px;"
        />
        我的</van-tabbar-item>
    </van-tabbar>
    <nursing v-if="active===0"></nursing>
    <order v-if="active===1"></order>
    <msg v-if="active===2"></msg>
    <my v-if="active===3"></my>
  </div>
</template>

<script>
  import nursing from '@/pages/index/index'
  import order from '@/pages/order/index'
  import my from '@/pages/my/index'
  import msg from '@/pages/message/index'

export default {
  components: {
    nursing,
    order,
    my,
    msg
  },
  data () {
    return {
      active: 0,
      msgN:null,
      msgE:null,
      msgNum:null,
    }
  },
  beforeMount() {
    this.userId = wx.getStorageSync('userId')
    this.checkNew({userId:this.userId})
  },
  onShow(){
    this.checkNew({userId:this.userId})
  },
  methods:{
    onChange(event) {
      this.active =event.mp.detail
    },
    // 查询是否存在新消息
    async checkNew(params){
      await this.$fly.request({
        methods:'get',
        url:"pushMessage/checkNew",
        params
      }).then(res =>{
        if(res.code === 200) {
          this.msgN = res.data.message?res.data.message:0
          this.msgE = res.data.education?res.data.education:0
          this.msgNum =this.msgN + this.msgE
          console.log(this.msgNum);
        }}).catch((req)=>{
        console.log(req)
      })
    },
  },

}
</script>

<style>
  page{
    color: #2c3e50;
    background:rgba(247,247,247,1);
  }
</style>
