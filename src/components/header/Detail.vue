<template>
    <div class="container">
        <div class="name">{{seller.name}}</div>
        <div class="star">
          <star :score="seller.score" :size="24"></star>
        </div>

      <div class="content" ref="wrapper">
        <div>
          <div class="header">
            <div class="line"></div>
            <p class="text">优惠信息</p>
            <div class="line"></div>
          </div>
          <div class="supports-wrapper">
            <div class="supports" v-for="item in seller.supports" :key="item.type">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </div>
          </div>
          <div class="header">
            <div class="line"></div>
            <p class="text">商家公告</p>
            <div class="line"></div>
          </div>
          <div class="bulletin">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="icon-close" @click="closeDetail"></div>
    </div>
</template>

<script>
  import Star from 'components/star/Star'
  import BScroll from 'better-scroll'
    export default {
      name: "HeaderDetail",
      props: {
          seller: Object
      },
      data () {
        return {
          classMap : ['decrease','discount','guarantee','invoice','special']
        }
      },
      components: {
        Star
      },
      methods: {
        closeDetail () {
          this.$emit('close')
        }
      },
      mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      }
    }
</script>

<style lang="stylus" scoped>
  @import "~stylus/mixins.styl"
  .star-container
    margin auto
  .container
    position fixed
    z-index 10
    top 0
    left 0
    right 0
    bottom 0
    text-align center
    color #fff
    background rgba(7,17,27,0.8)
    .name
      margin-top 3.2rem
      margin-bottom .8rem
      font-size .8rem
      font-weight 700
    .content
      overflow hidden
      position absolute
      top 6rem
      left 1.8rem
      right 1.8rem
      bottom 4.6rem
      .header
        display flex
        align-items center
        justify-content center
        margin-top 1.4rem
        padding 0
        .text
          flex 0 0 auto
          font-size .7rem
          margin 0 .6rem
        .line
          width 100%
          height 0
          border-top .1rem solid rgba(255,255,255,0.2)
      .supports-wrapper
        padding .6rem .6rem 0 .6rem
        .supports
          display flex
          align-items center
          margin-top .6rem
          .icon
            width .8rem
            height .8rem
            background-size .8rem .8rem
            margin-right .3rem
            background-repeat no-repeat
            &.decrease
              bg-icon("decrease_1")
            &.discount
              bg-icon('discount_1')
            &.guarantee
              bg-icon('guarantee_1')
            &.invoice
              bg-icon('invoice_1')
            &.special
              bg-icon('special_1')
          .text
            height .6rem
            font-size .5rem
            font-weight 200
            margin-bottom 0
      .bulletin
        margin 1.2rem .6rem 0 .6rem
        font-size .6rem
        line-height 1.2rem
        text-align left
        font-weight 200
    .icon-close
      position fixed
      left 50%
      bottom 1.6rem
      transform translateX(-50%)
      font-size 1.6rem
      color rgba(255,255,255,0.5)

</style>
