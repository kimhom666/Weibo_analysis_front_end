<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autocomplete="on"
        :model="loginForm"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">普通用户注册</h2>
        <el-form-item prop="username">
          <el-input
            class="input_window"
            @input="changeSequence"
            name="username"
            type="text"
            v-model="registerForm.username"
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop = "phone_number">
         <el-input
            class="input_window"
            @input="changeSequence"
            name="username"
            type="text"
            v-model="registerForm.phone_number"
            placeholder="请输入用户电话号码"
            >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input_window"
            @input="changeSequence"
            name="password"
            v-model="registerForm.password1"
            placeholder="请输入密码"
            show-password
          >
            <!-- <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span> -->
          </el-input>
          <el-input
            class="input_window"
            @input="changeSequence"
            name="password"
            v-model="registerForm.password2"
            placeholder="请确认密码"
            show-password
          >
            <!-- <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span> -->
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleRegister"
          >确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
  </div>
</template>
<script>
import {registerUser} from "../request/api"
export default {
data() {
    return {
      value: true,

      registerForm: {
        username: "",
        password1: "",
        password2: "",
        phone_number:"",

      },
      loading: false,
      pwdType: "password",
      text:""
    };
  },
    methods:{
        handleRegister(){
            console.log(this.registerForm)
            var reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])d{8}$/;    
            console.log(!reg_tel.test(this.registerForm.phone_number))
            console.log(this.registerForm.phone_number)
            if (!(/^1[3456789]\d{9}$/.test(this.registerForm.phone_number))){
                this.registerForm.phone_number=""
                alert("电话号码格式不正确")
                return 
            }
            console.log(this.registerForm.password1 == this.registerForm.password2)
            if(!(this.registerForm.password1 == this.registerForm.password2)){
                this.registerForm.password1 = ""
                this.registerForm.password2 = ""
                alert("前后密码不同, 请确认")
                return
            }
            if(this.registerForm.phone_number == "" || this.registerForm.password1 == "" || this.registerForm.username == ""){
                alert("请输入完整信息")
                return 
            }
            var params = {
                "user_name": this.registerForm.username,
                "phone_number": this.registerForm.phone_number,
                "password":this.registerForm.password1
            }
            registerUser(params).then(res=>{
                console.log(res.data)
                if(res.data.status == "200"){
                    alert("注册成功")
                }else{
                    alert("注册失败,原因是"+res.data.text)
                }

            })
        },
}
}
</script>
<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}
 
.login-title {
  text-align: center;
}
 
.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
.input_window{
  height: 30px;
  width: 300px;
}
.switch{
 float: "right"

}
</style>