<template>
  <div>
    <Card dis-hover>
        <p slot="title">
            <Icon type="ios-person"></Icon>
            欢迎
        </p>
        <a href="#" slot="extra" @click.prevent="options">
            <Icon type="ios-gear"></Icon>
            设置您的购买选项
        </a>
        <ul>
          <li>用户信息</li>
          <li>护照及出境信息</li>
          <li>选项信息</li>
        </ul>
        <a href="javascript:void(0)" @click="quit">注销</a>
    </Card>
  </div>
</template>

<script>
import { setCookie,getCookie,delCookie } from '@/assets/js/cookie.js'
export default {
  name: 'home',
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    let uname = getCookie('username')
    this.name = uname;
    if (uname == '') {
      this.$router.push('/')
    }
  },
  methods: {
    quit() {
      delCookie('username')
      this.$router.push('/')
    },
    options () {
      this.$router.push({ name: 'Options' })
    }
  }
}
</script>

<style scoped>
.card{
  width: 100%;
  height: 100%;
  background-color: #fcfcfc;
  padding: 10px;
  box-sizing: border-box
}
.card .head{
  border-bottom: 1px solid #999;
  display: flex
}
.card .foot{
  border-top: 1px solid #999;
  height: 25px;
  line-height: 25px
}
.card .content{
  padding: 10px 0;
  background-color: #fff;
  clear: both;
}
.title{
  flex: 1;
  text-align: left
}
.options{
  flex: 1;
  text-align: right
}
</style>

