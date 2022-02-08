import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: {
      username: 'admin',
      password: '123456789'
    },
    members: [],
    products: [],
    orders: [],
  },
  mutations: {
    addMember(state, member) {
      state.members.push(member)
      // state.members = [...state.members, member]
    },
    editMember(state, {member, index}) {
      state.members[index] = member
    },
    addProduct(state, product){
      state.products.push(product)
    },
    editProduct(state, {product, index}) {
      state.products.splice(index,1,product)
    },
    addOrder(state, order){
      state.orders.push(order)
    }
  },
  actions: {
    addMember({commit}, member) {
      commit('addMember', member)
    },
    editMember({commit}, data) {
      commit('editMember', data)
    },
    addProduct({commit}, product) {
      commit('addProduct', product)
    },
    editProduct({commit}, {product, index}) {
      commit('editProduct', {product, index})
    },
    addOrder({commit},order) {
      commit('addOrder', order)
    }
  },
  getters: {
    getAccount(state) {
      return state.account
    },
    getMember(state) {
      return state.members
    },
    getProduct(state) {
      return state.products
    },
    getOrder(state) {
      return state.orders
    }
  },
  modules: {},
});
