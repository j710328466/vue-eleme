<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount >0}">
            <span class="">车</span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <span class="price" :class="{'highlight': totalPrice >0}">￥{{totalPrice}}</span>
        <span class="desc">另需配送费￥{{deliveryPrice}}元</span>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
        <div transition-group="drap" v-for=" ball in balls" v-show="ball.show" class="ball">
          <div class="inner"></div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ]
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "./style/shopCart.styl";
</style>
