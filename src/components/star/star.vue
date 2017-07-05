<template>
  <div class="star" :class="starType">
    <span v-for="itemclass in itemClasses" :class="itemclass" class="star-item"></span>
  </div>
</template>

<script>
const STARLENG = 5
const CLS_ON = 'on'
const CLS_HELF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HELF)
      }
      while (result.length < STARLENG) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "./style/star.styl";
</style>
