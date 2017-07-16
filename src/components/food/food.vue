<template>
  <transition name="move">
    <div class="food" v-show="showFlag">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back">
            <i @click="hide" class="icon-leave"><</i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <transition name="fade">
            <div @click="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
          <div class="cartcontrol-wrapper">
            <cart-contral :food="food"></cart-contral>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.info"></split>
        <rating-select></rating-select>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartContral from '../cartContral/cartcontral'
import split from '../split/split.vue'
import ratingSelect from '../ratingselect/ratingselect'

export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  components: {
    cartContral,
    split,
    ratingSelect
  },
  methods: {
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$el, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      if (event._contructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "./style/food.styl";
</style>
