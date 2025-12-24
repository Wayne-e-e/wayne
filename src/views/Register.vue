<template>
  <el-card style="max-width: 400px; margin: 100px auto;">
    <h2>注册</h2>
    <el-form @submit.prevent="handleRegister">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.confirmPassword" type="password" />
      </el-form-item>
      <el-button type="primary" native-type="submit">注册</el-button>
      <p style="margin-top: 10px;">
        已有账号？<router-link to="/login">立即登录</router-link>
      </p>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    handleRegister() {
      if (this.form.password !== this.form.confirmPassword) {
        this.$message.error('两次密码不一致')
        return
      }
      // 简化：注册成功直接跳转登录（实际可调用 API）
      this.$message.success('注册成功！请登录')
      this.$router.push('/login')
    }
  }
}
</script>