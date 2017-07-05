<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <icon class="text">{{seller.supports[0].description}}</icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">
          {{seller.supports.length}}个
          <i class="arrow-r">></i>
        </span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="arrow-r">></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wraper clearfix">
        <div class="detail-main">
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
          <div class="detail-wraper clearfix">
            <div class="detail-main">
              <p class="name">{{seller.name}}</p>
              <div class="star-wraper">
                <v-star :size="48" :score="seller.score"></v-star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item,index) in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="bulletin-text">{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
        <div class="detail-close" @click="closeDetail">X</div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star.vue'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  components: {
    'v-star': star
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    closeDetail () {
      this.detailShow = false
    }
  }
}
</script>

<style lang='stylus' scoped>
@import "./styl/header.styl";
@import "../../common/stylus/index.styl";
</style>
