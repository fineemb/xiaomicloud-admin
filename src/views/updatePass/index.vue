<template>
  <div class="upf-container">
    <el-form ref="passForm" :model="passForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <el-form-item prop="oldPass">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="oldPass"
          v-model="passForm.oldPass"
          :type="oldpassType"
          placeholder="旧密码"
          name="oldPass"
          tabindex="1"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd('old')">
          <svg-icon :icon-class="oldpassType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="passForm.password"
          :type="passwordType"
          placeholder="新密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin('passForm')"
        />
        <span class="show-pwd" @click="showPwd('new')">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native="handleLogin('passForm')">修改</el-button>
    </el-form>
  </div>
</template>

<script>
import { updatePass } from '@/api/user'

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      passForm: {
        oldPass: '',
        password: ''
      },
      loginRules: {
        oldPass: [{ required: true, trigger: 'blur', validator: validatePassword }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      oldpassType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd(r) {
      if (r === 'old') {
        if (this.oldpassType === 'password') {
          this.oldpassType = ''
        } else {
          this.oldpassType = 'password'
        }
      } else {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      }

      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.listLoading = true
          updatePass(this.passForm).then(response => {
            this.listLoading = false
            this.$message('密码修改成功, 请重新登录!')
            this.logout()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {

}
/* reset element-ui css */
.upf-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.upf-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 88px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
