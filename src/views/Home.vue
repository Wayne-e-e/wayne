<template>
  <div>
    <h1>商品主页</h1>
    <el-row :gutter="20">
      <el-col v-for="p in products" :key="p.id" :span="6">
        <el-card>
          <h3>{{ p.name }}</h3>
          <p>¥{{ p.price }}</p>
          <img v-bind:src="p.image" >
          <p>库存: {{ p.stock }}</p>
          <el-button type="primary" size="small" @click="goDetail(p.id)">查看详情</el-button>
          <el-button size="small" @click="addToCart(p)">加入购物车</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  computed: {
    ...mapState('catalog', ['products'])
  },
  async created() {
    await this.fetchProducts()
  },
  methods: {
    ...mapActions('catalog', ['fetchProducts']),
    ...mapActions('cart', ['ADD_TO_CART']),
    goDetail(id) {
      this.$router.push(`/product/${id}`)
    },
    addToCart(product) {
      this.ADD_TO_CART(product)
      this.$message.success('已加入购物车')
    }
  }
}
</script>

