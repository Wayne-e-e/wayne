<template>
  <el-card style="max-width: 400px; margin: 100px auto;">
    <h2>登录</h2>
    <el-form @submit.prevent="handleLogin">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-button type="primary" native-type="submit">登录</el-button>
      <p>测试账号：user / 123</p>
    </el-form>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      form: { username: 'user', password: '123' }
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async handleLogin() {
      try {
        await this.login(this.form)
        this.$router.push('/')
      } catch (err) {
        this.$message.error(err.message)
      }
    }
  }
}
</script>