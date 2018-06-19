<template>
  <div>
      <Card>
      <p slot="title">
            <Icon type="ios-person"></Icon>
            注册
        </p>
    <Form ref="registerForm" :model="registerForm" :rules="ruleValidate" :label-width="80">
      <FormItem label="姓名" prop="name">
          <Input v-model="registerForm.name" placeholder="请输入用户名"></Input>
      </FormItem>
      <FormItem label="E-mail" prop="mail">
          <Input v-model="registerForm.mail" placeholder="请输入邮箱地址"></Input>
      </FormItem>
      <FormItem label="性别" prop="gender">
          <RadioGroup v-model="registerForm.gender">
              <Radio label="male">男</Radio>
              <Radio label="female">女</Radio>
          </RadioGroup>
      </FormItem>
      <FormItem label="密码" prop="passwd">
            <Input type="password" v-model="registerForm.passwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
            <Input type="password" v-model="registerForm.passwdCheck"></Input>
        </FormItem>
      <FormItem>
          <Button type="primary" @click="handleSubmit('registerForm')">Submit</Button>
          <Button type="ghost" @click="handleReset('registerForm')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
    </Card>
  </div>
</template>

<script>
import axios from 'axios'
import { setCookie, getCookie, delCookie } from '@/assets/js/cookie.js'
export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if (this.registerForm.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.registerForm.validateField('passwdCheck')
                    }
                    callback()
                }
            }
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.registerForm.passwd) {
                    callback(new Error('两次密码输入不一致'))
                } else {
                    callback();
                }
            }
            return {
                registerForm: {
                    name: '',
                    mail: '',
                    gender: '',
                    passwd: '',
                    passwdCheck: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
