<template>
  <div class="cartcontral">
    <transition name="move">
      <div class="cart-decrase" v-show="food.count>0" @click="decraseCart">-</div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" ref="shopcart" @click="addCart">+</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
      console.log()
    },
    methods: {
      decraseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      },
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('listen', this.$el.lastChild)
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "./style/cartcontral.styl";
</style>
