<template>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li v-for="(item, index) in goods" class="menu-item"
           :class="{'current': currentIndex === index-1}"
           @click = "selectMenu(index, $event)">
            <span class="text">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <shop-cart  ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
       :min-price="seller.minPrice"
      ></shop-cart>
      <v-food :food="selectedFood" ref="food"></v-food>
      <div class="foods-wrapper" >
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img @click="selectFood(food,$event)" width="57px" height="57px" :src="food.icon" alt="">
                </div>
                <div class="content">
                  <div class="name">{{food.name}}</div>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontral-wrapper">
                    <cart-contral v-on:listen="_drop" :food="food"></cart-contral>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopCart from '../shopCart/shopCart'
import cartContral from '../cartContral/cartcontral'
import food from '../food/food.vue'

const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  components: {
    shopCart,
    cartContral,
    'v-food': food
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((res) => {
      res = res.body
      if (res.errno === ERR_OK) {
        this.goods = res.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    _drop (target) {
      this.$refs.shopcart.drop(target)
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$el.querySelectorAll('.food-list-hook')
      let el = foodList[index]
      console.log(el)
      this.foodsScroll.scrollToElement(el, 300)
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$el.firstChild, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$el.lastChild, {
        probeType: 3,
        click: true
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$el.querySelectorAll('.food-list-hook')
      let height = 0
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
    }
  }
}
</script>


<style lang="stylus" scoped>
@import "./style/goods.styl";
</style>
