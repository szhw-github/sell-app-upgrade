<template>
    <div class="star-container" v-if="score&&hasGetStarClass">
      <div class="star"
           :class="['star'+size,item]"
           v-for="item in starClass"
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
          starClass:[]
        }
      },
      computed: {
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
        width 1.2rem
        height 1.2rem
        margin-right .6rem
        bg-img({p:0.4,positionX:0,positionY:-3})
      &.star36
        width 1.8rem
        height 1.8rem
        margin-right .9rem
        bg-img({p:0.6,positionX:0,positionY:-3})
      &.star48
        width 2.4rem
        height 2.4rem
        margin-right 1.2rem
        bg-img({p:0.8,positionX:0,positionY:-3})
    .half
      &.star24
        width 1.2rem
        height 1.2rem
        margin-right .6rem
        bg-img({p:0.4,positionX:-3,positionY:-3})
      &.star36
        width 1.8rem
        height 1.8rem
        margin-right .9rem
        bg-img({p:0.6,positionX:-3,positionY:-3})
      &.star48
        width 2.4rem
        height 2.4rem
        margin-right 1.2rem
        bg-img({p:0.8,positionX:-3,positionY:-3})
    .off
      &.star24
        width 1.2rem
        height 1.2rem
        margin-right .6rem
        bg-img({p:0.4,positionX:-6,positionY:-3})
      &.star36
        width 1.8rem
        height 1.8rem
        margin-right .9rem
        bg-img({p:0.6,positionX:-6,positionY:-3})
      &.star48
        width 2.4rem
        height 2.4rem
        margin-right 1.2rem
        bg-img({p:0.8,positionX:-6,positionY:-3})
</style>
