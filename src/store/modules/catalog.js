import { getProducts, getProductById } from '../../api/mockApi'

export default {
  namespaced: true,
  state: {
    products: [],
    
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    
    // 添加评论
    ADD_COMMENT(state, { productId, comment }) {
      const productInList = state.products.find(p => p.id === productId)
      if (productInList) {
        productInList.comments = productInList.comments || []
        productInList.comments.push(comment)
      }
      if (state.currentProduct && state.currentProduct.id === productId) {
        state.currentProduct.comments = state.currentProduct.comments || []
        state.currentProduct.comments.push(comment)
      }
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      const products = await getProducts()
      commit('SET_PRODUCTS', products)
    },
    
    // 从 state.user 读取用户信息
    addComment({ commit, rootState }, { productId, content, rating }) {
      const user = rootState.user.user || { id: 'guest', username: '匿名用户' }

      const newComment = {
        id: Date.now(),
        userId: user.id,
        username: user.username,
        rating: rating,
        content: content,
        createdAt: new Date().toISOString().split('T')[0]
      }

      commit('ADD_COMMENT', { productId, comment: newComment })
    }
  }
}