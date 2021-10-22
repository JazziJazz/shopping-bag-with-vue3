import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    loadProducts: function(state, products) {
      state.products = products;
    }
  },
  actions: {
    loadProducts: function({ commit }) {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        commit("loadProducts", response.data);
      });
    },
    
  },
  modules: {},
});
