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
        <h2 class="login-title color-main">聊天登陆</h2>
        <el-form-item prop="username">
          <el-input
            class="input_window"
            @input="changeSequence"
            name="username"
            type="text"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          >
            <!-- <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input_window"
            @input="changeSequence"
            name="password"
            v-model="loginForm.password"
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
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" round
      @click.native.prevent="jumptouserregister"
      >普通用户注册</el-button>
      <el-button type="primary" round
      @click.native.prevent="jumptoadminregister"
      >管理员用户注册</el-button>
      <el-form>
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="管理员登陆"
          inactive-text="平台用户登录"
          @change="show_the_choice">
        </el-switch>

      </el-form>
    </el-card>
    
  </div>
</template>


<script>
import {login, login_admin} from "../request/api"
export default {
  data() {
    return {
      value: true,

      loginForm: {
        username: "",
        password: ""
      },
      loading: false,
      pwdType: "password",
      text:""
    };
  },
  methods: {
    jumptouserregister(){
        this.$router.push({
          path: "/userregister",
        });    },
    jumptoadminregister(){
    this.$router.push({
          path: "/adminregister",
        });  
    },
    show_the_choice(){
        console.log(this.value)
    },    
    handleLogin() {
      if (this.value== true){
           var params = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        type: this.value
      }
      console.log(params)
      
      login(params).then(res=>{
        console.log(res.data)
        if (res.data.status ==200){
              alert("登陆成功，等待跳转")
              localStorage.setItem("user_name", this.loginForm.username)
              this.$router.push({
                  path: "/talk",
                //   query: { message: response.data.message }
        });
        }
        else{
          this.$alert('密码错误', '请检查您的用户名和密码', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        }
        })
      }
      else{
        var params_admin = {
            username:this.loginForm.username,
            password: this.loginForm.password
          }
        login_admin(params_admin).then(res=>{
          console.log(res.data)
        if (res.data.status ==200){
              alert("登陆成功，等待跳转")
              localStorage.setItem("user_name", this.loginForm.username)
              this.$router.push({
                  path: "/backstage",
          });
        }
        else{
          this.$alert('密码错误', '请检查您的用户名和密码', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        }
        })
        
      }
    }
  }
};
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