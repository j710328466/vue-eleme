<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span>{{desc.all}}</span>
      <span>{{desc.positive}}</span>
      <span>{{desc.negative}}</span>
      span
    </div>
    <div class="switch">
      <span class="icon-check_circle"></span>
    </div>
  </div>
</template>

<script>
  var ALL = ''

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "./style/ratingselect.styl"
</style>
