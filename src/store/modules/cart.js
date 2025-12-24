// src/store/modules/cart.js
const state = () => ({
  items: JSON.parse(localStorage.getItem('cartItems') || '[]')
})

const getters = {
  totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

const mutations = {
  ADD_TO_CART(state, product) {
    const existing = state.items.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      state.items.push({
        ...product,
        quantity: 1
      })
    }
    localStorage.setItem('cartItems', JSON.stringify(state.items))
  },
  UPDATE_QUANTITY(state, { id, quantity }) {
    const item = state.items.find(i => i.id === id)
    if (item) {
      item.quantity = Math.max(1, quantity)
      localStorage.setItem('cartItems', JSON.stringify(state.items))
    }
  },
  CLEAR_CART(state) {
    state.items = []
    localStorage.removeItem('cartItems')
  }
}

const actions = {
  ADD_TO_CART({ commit }, product) {
    commit('ADD_TO_CART', product)
  },
  UPDATE_QUANTITY({ commit }, payload) {
    commit('UPDATE_QUANTITY', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}