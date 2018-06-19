<template>
  <div>
    <!-- 登录 -->
    <template  v-if="showLogin">
      <Login></Login>
      <p class="to-other"><a @click="ToRegister">没有账号？马上注册</a></p>
    </template>
    <!-- 注册 -->
    <template v-else-if="showRegister">
      <Register></Register>
      <p class="to-other"><a @click="ToLogin">已有账号？马上登录</a></p>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import Login from '@/components/Login'
import Register from '@/components/Register'
import { setCookie, getCookie, delCookie } from '@/assets/js/cookie.js'
export default {
  components: {
    Login,
    Register
  },
  data () {
    return {
      showLogin: true,
      showRegister: false
    }
  },
  methods: {
    ToRegister () {
      this.showRegister = true
      this.showLogin = false
    },
    ToLogin () {
      this.showRegister = false
      this.showLogin = true
    }
  }
}
</script>

<style scoped>
.to-other{
  padding: 16px
}
</style>
