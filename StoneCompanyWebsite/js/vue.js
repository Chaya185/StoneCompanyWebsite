Vue.component("product-list", {
  props: {
    products: Array,
  },

  template: `
    <div>
      <product v-for="(product, index) in products" :key="index"
               :name="product.name" :stock="product.stock" :cart.sync="product.cart" :cost="product.cost"  
               @update:cart="updateCart(index, $event)" @update:stock="updateStock(index, $event)" 
               @update:cost="updateCost(index, $event)"  />
   
      <div v-if="totalCart > 0" class="total-cart">
      <hr>
       <b>Cart: {{ totalCart }} </b><br>
       <b>Total Cost: {{totalCost}} </b>
      
      </div> 
    </div>
  `,

  computed: {
    totalCart() {
      return this.products.reduce((total, product) => total + product.cart, 0);
    },
    totalCost() {
      return this.products.reduce(
        (total, product) => total + product.cart * product.cost,
        0
      );
    },
  },

  methods: {
    updateCart(index, cart) {
      this.$set(this.products[index], "cart", cart);
    },
    updateStock(index, stock) {
      this.$set(this.products[index], "stock", stock);
    },
    updateCost(index, cost) {
      this.$set(this.products[index], "cost", cost);
    },
  },
});

Vue.component("product", {
  props: {
    name: String,
    stock: Number,
    cart: Number,
    cost: Number,
  },

  template: `
    <div class="product">
      <h3>{{ name }}</h3>
      <div class="stock">
        Stock: <span :class="{ outOfStock: stock === 0 }">{{ stock }}</span>
      </div>
      <div class="cart">
        Cart: {{ cart }}
      </div>
      <div class="cost">
        Cost: {{ cost }}
      </div>
      <button @click="addToCart" :disabled="stock === 0">+</button>
      <button @click="removeFromCart" :disabled="cart === 0">-</button>
      <div v-if="stock === 0" class="out-of-stock-message">
        Out of Stock
      </div>
      <hr>
    </div>
  `,

  methods: {
    addToCart() {
      this.$emit("update:cart", this.cart + 1);
      this.$emit("update:stock", this.stock - 1);
      this.$emit("update:cost", this.cost + cost);
    },
    removeFromCart() {
      this.$emit("update:cart", this.cart - 1);
      this.$emit("update:stock", this.stock + 1);
    },
  },
});

new Vue({
  el: "#app",
  data: {
    name: "",
    products: [
      {
        name: "Marble",
        stock: 6,
        cart: 0,
        cost: 800,
      },
      {
        name: "Granite",
        stock: 8,
        cart: 0,
        cost: 1000,
      },
      {
        name: "Quartzite",
        stock: 12,
        cart: 0,
        cost: 1500,
      },
    ],
  },
});
