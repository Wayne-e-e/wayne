import { createStore } from 'vuex'
import user from './modules/user'
import catalog from './modules/catalog'
import cart from './modules/cart'
import order from './modules/order'

export default createStore({
  modules: {
    user,
    catalog,
    cart,
    order
  }
})