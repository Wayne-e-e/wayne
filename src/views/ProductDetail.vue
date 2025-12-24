<template>
  <div style="max-width: 800px; margin: 40px auto; padding: 20px;">
    <el-button icon="arrow-left" @click="$router.back()">返回</el-button>
    <el-card v-if="product">
      <h2>{{ product.name }}</h2>
      <img v-bind:src="product.image" >
      <p><strong>价格：</strong>¥{{ product.price }}</p>
      <p><strong>分类：</strong>{{ product.category }}</p>
      <p><strong>库存：</strong>{{ product.stock }} 件</p>
      <el-button
        type="primary"
        :disabled="product.stock <= 0"
        @click="handleAddToCart"
      >
        {{ product.stock > 0 ? '加入购物车' : '库存不足' }}
      </el-button>

      <!-- 评论区域 -->
      <div class="comments-section" style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
        <h3>用户评价 ({{ product.comments?.length || 0 }})</h3>

        <!-- 评论列表 -->
        <div v-if="product.comments && product.comments.length > 0" class="comment-list">
          <div
            v-for="comment in product.comments"
            :key="comment.id"
            class="comment-item"
            style="padding: 12px 0; border-bottom: 1px dashed #ddd;"
          >
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <strong>{{ comment.username }}</strong>
              <el-rate
                v-model="comment.rating"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} 星"
                size="small"
              />
            </div>
            <p style="margin: 6px 0;">{{ comment.content }}</p>
            <small style="color: #999;">{{ comment.createdAt }}</small>
          </div>
        </div>
        <p v-else style="color: #999;">暂无用户评论</p>

        <!-- 发表评论表单（仅登录用户） -->
        <div v-if="isLoggedIn" class="add-comment" style="margin-top: 20px;">
          <h4>发表你的评价</h4>
          <el-rate v-model="newComment.rating" />
          <el-input
            v-model="newComment.content"
            type="textarea"
            placeholder="分享你的使用体验..."
            :rows="3"
            style="margin: 10px 0;"
          />
          <el-button type="primary" size="small" @click="submitComment">提交评价</el-button>
        </div>
        <div v-else style="margin-top: 15px; color: #666;">
          请 <router-link to="/login" style="color: #409eff;">登录</router-link> 后发表评论
        </div>
      </div>
      <!-- 评论区域结束 -->
    </el-card>
    <el-empty v-else description="商品不存在" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      // 评论表单数据
      newComment: {
        rating: 5,
        content: ''
      }
    }
  },
  computed: {
    ...mapState('catalog', ['products']),
    ...mapState('user', ['token']), // 获取登录状态
    product() {
      const id = Number(this.$route.params.id)
      return this.products.find(p => p.id === id)
    },
    isLoggedIn() {
      return !!this.token
    }
  },
  async created() {
    if (this.products.length === 0) {
      await this.fetchProducts()
    }
  },
  methods: {
    ...mapActions('catalog', ['fetchProducts', 'addComment']), 
    ...mapActions('cart', ['ADD_TO_CART']),
    handleAddToCart() {
      this.ADD_TO_CART(this.product)
      this.$message.success('已加入购物车')
    },
    // 提交评论
    async submitComment() {
      if (!this.newComment.content.trim()) {
        this.$message.warning('请输入评论内容')
        return
      }
      if (this.newComment.rating < 1) {
        this.$message.warning('请给出评分')
        return
      }

      try {
        await this.addComment({
          productId: this.product.id,
          rating: this.newComment.rating,
          content: this.newComment.content
        })
        this.$message.success('感谢您的评价！')
        this.newComment.content = '' // 清空内容，保留评分
      } catch (err) {
        this.$message.error('提交失败，请重试')
      }
    }
  }
}
</script>

<style scoped>

.comment-item:last-child {
  border-bottom: none;
}
</style>