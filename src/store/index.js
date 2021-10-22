import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    loadProducts: function(state, products) {
      return state.products = products;
    },

    loadBag: function(state, products) {
      return state.productsInBag = products;
    },

    addToBag: function(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));
    },

    removeFromBag: function(state, product) {
      let updatedBag = state.productsInBag.filter(
        (item) => item.id != product.id
      );
      state.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));
    },
  },
  actions: {
    loadProducts: function({ commit }) {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        commit("loadProducts", response.data);
      });
    },

    loadBag: function({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        commit("loadBag", JSON.parse(localStorage.getItem("productsInBag")));
      }
    },

    addToBag: function({ commit }, product) {
      return commit("addToBag", product);
    },

    removeFromBag: function({ commit }, product) {
      if (confirm("Você tem certeza que quer remover esse produto do seu carrinho?")) {
        return commit("removeFromBag", product);
      }
    },
  },
  modules: {},
});
