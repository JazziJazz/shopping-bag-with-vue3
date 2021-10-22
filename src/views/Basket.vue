<template>
  <div class="basket">

    <template v-if="productsInBag.length > 0">
      <div class="items">
        <div v-for="(product, index) in productsInBag" v-bind:key="index" class="item">
          <div v-on:click="removeFromBag(product)" class="remove">Remover Produto</div>

          <div class="photo">
            <img v-bind:src="product.image"/>
          </div>

          <div class="description">{{ product.title }}</div>

          <div class="price">
            <span class="quantity-area">
              <button v-on:click="product.quantity--;" v-bind:disabled="product.quantity <= 0">-</button>
              <span class="quantity">{{ product.quantity }}</span>
              <button v-on:click="product.quantity++;">+</button>
            </span>
            <span class="amount">R$ {{ product.price }}</span>
          </div>
        </div>

        <div class="grand-total">Total do pedido: R$ {{ getTotalPrice() }}</div>
      </div>
    </template>

    <template v-else>
      <h1>Você não tem produtos no seu carrinho.</h1>
    </template>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Basket",

  computed: mapState(["productsInBag"]),

  methods: {
    removeFromBag: function(product) {
      return this.$store.dispatch("removeFromBag", product);
    },

    getTotalPrice: function() {
      let totalValue = 0;

      this.productsInBag.forEach((element) => {
        totalValue += element.price * element.quantity
      });

      return totalValue.toFixed(2);
    }
  },
};
</script>

<style lang="scss">
.basket {
  padding: 60px 0;
  .items {
    max-width: 800px;
    margin: auto;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 40px 0;
      border-bottom: 1px solid lightgrey;
      position: relative;

      .remove {
        position: absolute;
        top: 8px;
        right: 0;
        font-size: 11px;
        text-decoration: underline;
        cursor: pointer;
      }

      .quantity-area {
        margin: 8px auto;
        height: 14px;

        button {
          width: 16px;
          height: 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .quantity {
          margin: 0 4px;
        }
      }

      .photo {
        img {
          max-width: 80px;
        }
      }

      .description {
        padding-left: 30px;
        box-sizing: border-box;
        max-width: 50%;
      }

      .price {
        .amount {
          font-size: 16px;
          margin-left: 8px;
          vertical-align: middle;
        }
      }
    }
    .grand-total {
      font-size: 24px;
      font-weight: bold;
      text-align: right;
      margin-top: 8px;
    }
  }
}
</style>
