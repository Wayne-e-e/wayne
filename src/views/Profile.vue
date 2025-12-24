<template>
  <div style="max-width: 600px; margin: 60px auto;">
    <el-card>
      <h2>会员中心</h2>
      <el-descriptions title="基本信息" :column="1" border>
        <el-descriptions-item label="用户名">{{ user.username || '未登录' }}</el-descriptions-item>
        <el-descriptions-item label="会员等级">{{ user.level || '普通会员' }}</el-descriptions-item>
        <el-descriptions-item label="积分">{{ user.points || 0 }}</el-descriptions-item>
      </el-descriptions>

      <el-card style="margin-top: 20px;">
        <h3>我的优惠券</h3>
        <el-tag type="success" size="large">满5000减200（有效期至2025-12-31）</el-tag>
        <el-tag style="margin-left: 10px;">新人券：满1000减50</el-tag>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['user'])
  }
}
</script>