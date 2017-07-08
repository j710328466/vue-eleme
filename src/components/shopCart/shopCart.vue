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
      <transition-group name="drop"
       v-on:before-enter="beforeEnter"
       v-on:enter="enter"
       v-on:after-enter="afterEnter" tag="ul">
        <li v-for=" ball in balls" v-bind:key="ball.show" v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </li>
      </transition-group>
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
        ],
        dropBalls: []
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
    },
    methods: {
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length
        this.balls[1].show = true
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
            inner.style.transform = `translate3d(${x}px, 0, 0)`
          }
        }
      },
      enter (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.display = ''
          el.style.webkitTransform = 'translate3d(0, 0, 0)'
          let inner = el.getElementsByClassName('inner')[0]
          inner.style.webkitTransform = 'translate3d(0, 0, 0)'
          inner.style.transform = 'translate3d(0, 0, 0)'
        })
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "./style/shopCart.styl";
</style>
