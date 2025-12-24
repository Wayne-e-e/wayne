<template>
  <div style="max-width: 900px; margin: 40px auto;">
    <h1>我的订单</h1>
    <el-table :data="orders" :key="orders.length" v-if="orders.length">
      <el-table-column label="订单号" prop="id"></el-table-column>
      <el-table-column label="商品">
        <template #default="{ row }">
          <div v-for="item in row.items" :key="item.id">
            {{ item.name }} × {{ item.quantity }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总金额">
        <template #default="{ row }">
          ¥{{ row.total }}
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template #default="{ row }">
          {{ row.status }}
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-else description="暂无订单" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('order', ['orders'])
  },
  async created() {
    await this.fetchOrders()
  },
  methods: {
    ...mapActions('order', ['fetchOrders'])
  }
}
</script>