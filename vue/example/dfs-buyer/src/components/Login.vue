<template>
  <div>
    <Card>
      <p slot="title">
            <Icon type="ios-person"></Icon>
            登录
        </p>
        <Form :model="loginForm">
        <FormItem prop="username">
          <Input type="text" v-model="loginForm.username" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginForm.password" placeholder="密码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="login" long>登录</Button>
          
        </FormItem>
    </Form>
    </Card>
    
  </div>
</template>

<script>
import axios from 'axios'
import { setCookie, getCookie, delCookie } from '@/assets/js/cookie.js'
export default {
  data() {
    return {
      showLogin: false,
      showRegister: true,
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if (getCookie('username')) {
      this.$router.push('/home')
    }
  },
  methods: {
    login() {
      if (this.loginForm.username == '' || this.loginForm.password == '') {
        this.$Message.error('请输入用户名或密码')
      } else {
        let data = { username: this.loginForm.username, password: this.loginForm.password }
        /*接口请求*/
        axios
          .get('/static/data/login.json')
          .then(response => {
            console.log(response, response.data)
            /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
            if (response.data.status == -1) {
              this.$Message.error('该用户不存在!')
            } else if (response.data.status == 0) {
              this.$Message.error('密码错误!')
            } else if (response.data.status == 'admin') {
              /*路由跳转this.$router.push*/
              this.$router.push({ name: 'Home' })
            } else {
              this.$Message.success('登录成功!')
              setCookie('username', this.username, 1000 * 60)
              this.$router.push({ name: 'Home' })
            }
          })
          .catch(function(error) {
            this.$Message.info({
                content: error,
                duration: 20,
                closable: true
            })
          })
      }
    }
  }
}
</script>

<style>
.ivu-card-body{
  padding-bottom: 0;
}
.ivu-form-item:last-child{
  margin-bottom: 10px
}
</style>
