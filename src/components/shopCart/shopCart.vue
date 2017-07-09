<template>
  <div class="shopcart">
    <div class="content" >
      <div class="content-left">
        <div class="logo-wrapper" @click="toggleList">
          <div class="logo" :class="{'highlight': totalCount >0}">
            <span class="">车</span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <span class="price" :class="{'highlight': totalPrice >0}">￥{{totalPrice}}</span>
        <span class="desc">另需配送费￥{{deliveryPrice}}元</span>
      </div>
      <div class="content-right" @click="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop"
       v-on:before-enter="beforeEnter"
       v-on:enter="enter"
       v-on:after-enter="afterEnter" tag="li">
        <li v-for=" ball in balls" v-bind:key="ball.show" v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </li>
      </transition-group>
    </div>
    <transition name="fold">
      <div  class="shopcart-list" v-show="listShow">
        <div class="mask" @click="hideList"></div>
        <div class="list-header" v-bind:key="fold">
          <div class="title">购物车</div>
          <div class="empty" @click="empty">清空</div>
        </div>
        <div class="list-content">
          <ul>
            <li v-for="food in selectFoods" v-bind:key="food.name" class="food">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price*food.count}}</span></div>
              <div class="cartcontral-wrapper">
                <cart-contral :food="food"></cart-contral>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import cartContral from '../cartContral/cartcontral.vue'
  import BScroll from 'better-scroll'

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
    components: {
      cartContral
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
        dropBalls: [],
        fold: true
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
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              console.log(this.$el.querySelector('.list-content'))
              this.scroll = new BScroll(this.$el.querySelector('.list-content'), {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      hideList () {
        this.fold = true
      },
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
          el.style.webkitTransform = 'translate3d(0, 40px, 0)'
          let inner = el.getElementsByClassName('inner')[0]
          inner.style.webkitTransform = 'translate3d(0, 40px, 0)'
          inner.style.transform = 'translate3d(0, 40px, 0)'
        })
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        } else {
          alert(`请支付${this.totalPrice}元`)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "./style/shopCart.styl";
</style>
