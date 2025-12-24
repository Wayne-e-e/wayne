<template>
  <div id="app">
    <el-menu mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/cart">购物车({{ cartCount }})</el-menu-item>
      <el-menu-item index="/orders">订单</el-menu-item>
      <el-menu-item index="/profile">会员中心</el-menu-item>
      <el-menu-item @click="logout" v-if="isLoggedIn">退出</el-menu-item>
      <el-menu-item index="/login" v-else>登录</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['token']),
    ...mapGetters('cart', ['totalItems']),
    isLoggedIn() {
      return !!this.token
    },
    cartCount() {
      return this.totalItems
    }
  },
  methods: {
    ...mapActions('user', ['logout'])
  }
}
</script>
