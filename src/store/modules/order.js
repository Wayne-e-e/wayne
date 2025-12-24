// src/store/modules/order.js
const state = () => ({
  orders: []
})

const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  ADD_ORDER(state, order) {
    state.orders.unshift(order)
    localStorage.setItem('orders', JSON.stringify(state.orders))
  }
}

const actions = {
  async placeOrder({ commit, dispatch }, orderData) {
    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 500))

    const order = {
      id: 'ORD' + Date.now(),
      ...orderData,
      total: orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: '已支付',
      createdAt: new Date().toISOString()
    }

    commit('ADD_ORDER', order)
    
    try {
      await dispatch('cart/CLEAR_CART', null, { root: true })
    } catch (err) {
      console.warn('清空购物车失败:', err)
    }// 清空购物车
  },
  fetchOrders({ commit }) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    commit('SET_ORDERS', orders)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}