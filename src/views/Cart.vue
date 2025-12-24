<template>
  <div>
    <h1>购物车 ({{ totalItems }} 件)</h1>
    <el-table :data="items" v-if="items.length">
      <el-table-column prop="name" label="商品"></el-table-column>

      <el-table-column label="单价">
        <template #default="{ row }">
          ¥{{ row.price }}
        </template>
      </el-table-column>

      <el-table-column label="数量">
        <template #default="{ row }">
          <el-input-number v-model="row.quantity" :min="1" @change="updateQty(row)" />
        </template>
      </el-table-column>

      <el-table-column label="小计">
        <template #default="{ row }">
          ¥{{ row.price * row.quantity }}
        </template>
      </el-table-column>
    </el-table>
    <p v-else>购物车为空</p>
    <div style="text-align: right; margin-top: 20px;">
      <h3>总计：¥{{ totalPrice }}</h3>
      <el-button type="primary" @click="$router.push('/checkout')" :disabled="!items.length">去结算</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('cart', ['items']),
    ...mapGetters('cart', ['totalItems', 'totalPrice'])
  },
  methods: {
    ...mapMutations('cart', ['UPDATE_QUANTITY']),
    updateQty(row) {
      this.UPDATE_QUANTITY({ id: row.id, quantity: row.quantity })
    }
  }
}
</script>