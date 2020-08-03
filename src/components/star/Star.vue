<template>
    <div class="star-container" :style="container" v-if="score&&hasGetSize&&hasGetStarClass">
      <div class="star"
           :class="['star'+size,item]"
           v-for="item in starClass"
           :style="star"
      >
      </div>
    </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

    export default {
      name: "Star",
      props: {
        score: Number,
        size: Number
      },
      data () {
        return {
          onCount: 0,
          halfCount: 0,
          offCount: 0,
          star: {
            width: null,
            height: null,
            marginLeft: null,
            marginRight: null,
            backgroundSize: null,
            backgroundRepeat: 'no-repeat'
          },
          container:{
            width: null,
            height: null
          },
          starClass:[]
        }
      },
      computed: {
        hasGetSize () {
          const size = this.size + 'px'
          const halfSize = this.size*0.5 + 'px'
          this.star.width = size
          this.star.height = size
          this.star.marginLeft = halfSize
          this.star.marginRight = halfSize
          this.star.backgroundSize = [size, size]
          this.container.width = 2*LENGTH*this.size +'px'
          this.container.height = size
          return true
        },
        hasGetStarClass () {
          var onCount = parseInt(this.score)
          var halfCount = Math.round(this.score - onCount)
          for (var i = 0; i < LENGTH; i ++) {
            if (onCount > 0) {
              this.starClass.push(CLS_ON)
              onCount --
            }
            else if (halfCount > 0) {
              this.starClass.push(CLS_HALF)
              halfCount = 0
            }
            else {
              this.starClass.push(CLS_OFF)
            }
          }
          return true
        }
      }
    }
</script>

<style lang="stylus" scoped>
  @import "~stylus/mixins.styl"
  .star-container
    display flex
    position relative
    background rgba(0,0,0,0)
    .on
      &.star24
        bg-icon('star24_on')
      &.star36
        bg-icon('star48_on')
      &.star48
        bg-icon('star48_on')
    .half
      &.star24
        bg-icon('star24_half')
      &.star36
        bg-icon('star48_half')
      &.star48
        bg-icon('star48_half')
    .off
      &.star24
        bg-icon('star24_off')
      &.star36
        bg-icon('star48_off')
      &.star48
        bg-icon('star48_off')
</style>
