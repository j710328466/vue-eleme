+<template>
  <div id="app">
    <v-header :seller = 'seller'></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to='good'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='rating'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='seller'>商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/headers/headers.vue'
const ERR_OK = 0
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((res) => {
      res = res.body
      if (res.errno === ERR_OK) {
        this.seller = res.data
      }
    })
    console.log(this.seller)
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="styl" scoped>
@import "./common/stylus/index.styl";
#app
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)
</style>
