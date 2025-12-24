<template>
  <div style="max-width: 800px; margin: 40px auto;">
    <h1>结算页</h1>
    <el-card>
      <h3>收货地址</h3>
      <el-radio-group v-model="selectedAddress">
        <el-radio label="北京市朝阳区xxx街道123号">北京市朝阳区xxx街道123号（默认）</el-radio>
        <el-radio label="上海市浦东新区yyy路456号">上海市浦东新区yyy路456号</el-radio>
      </el-radio-group>
    </el-card>

    <el-card style="margin-top: 20px;">
      <h3>商品清单</h3>
      <el-table :data="cartItems" :show-header="false">
        <el-table-column>
          <template #default="{ row }">
            {{ row.name }} × {{ row.quantity }} — ¥{{ (row.price * row.quantity).toFixed(2) }}
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right; margin-top: 10px;">
        <strong>总计：¥{{ totalPrice }}</strong>
      </div>
    </el-card>

    <el-card style="margin-top: 20px;">
      <h3>发票</h3>
      <el-radio-group v-model="invoiceType">
        <el-radio label="no">不开发票</el-radio>
        <el-radio label="personal">个人发票</el-radio>
        <el-radio label="company">公司发票</el-radio>
      </el-radio-group>
    </el-card>

    <div style="text-align: center; margin-top: 30px;">
      <el-button @click="$router.back()">返回购物车</el-button>
      <el-button type="success" @click="placeOrder" :loading="submitting">
        确认支付 ¥{{ totalPrice }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      selectedAddress: '北京市朝阳区xxx街道123号',
      invoiceType: 'no',
      submitting: false
    }
  },
  computed: {
    ...mapState('cart', ['items']),
    ...mapGetters('cart', ['totalPrice']),
    cartItems() {
      return this.items
    }
  },
  methods: {
    ...mapActions('order', { submitOrderAction: 'placeOrder' }),
    ...mapActions('order', ['fetchOrders']),
    async placeOrder() {
      if (this.cartItems.length === 0) {
        this.$message.warning('购物车为空')
        return
      }
      this.submitting = true
      try {
        await this.submitOrderAction({
          address: this.selectedAddress,
          invoice: this.invoiceType,
          items: this.cartItems
        })
        this.$message.success('订单提交成功！')
        this.$router.push('/orders')
      } catch (err) {
        this.$message.error('下单失败，请重试', err)
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>