<template>
  <div class="home-header" v-if="seller">
    <div class="backgroud">
      <img class="backgroud-img" :src="seller.avatar">
    </div>
    <div class="content-wrapper">
      <img class="avatar" :src="seller.avatar"/>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}},满50减10</span>
        </div>
      </div>
      <div class="supports-count" @click="getDetail">
        <div class="count">{{seller.supports.length}}个</div>
        <div class="icon-keyboard_arrow_right"></div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <div class="icon"></div>
      <div class="bulletin">{{seller.bulletin}}</div>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <header-detail :seller="seller" v-show="showMore" @close="closeMore"></header-detail>
  </div>
</template>

<script>
  import HeaderDetail from './Detail'
  export default {
    name: "VHeader",
    props: {
      seller: Object
    },
    data () {
      return {
        showMore: false
      }
    },
    components: {
      HeaderDetail
    },
    methods: {
      getDetail () {
        this.showMore = true
      },
      closeMore () {
        this.showMore = false
      }
    },
    created() {
      this.classMap = ['decrease','discount','guarantee','invoice','special']
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus/mixins.styl"
  .home-header
    color #fff
    background rgba(7,17,27,0.5)
    .backgroud
      position fixed
      overflow hidden
      width 100%
      height 106px
      z-index -1
      filter blur(10px)
    .backgroud-img
      width 100%
    .content-wrapper
      display flex
      position relative
      padding 1.2rem .6rem .9rem 1.2rem
      .avatar
        width 3.2rem
        height 3.2rem
        border-radius .1rem
      .content
        font-size .6rem
        margin .1rem 0 .1rem .6rem
        .title
          display flex
          line-height .9rem
          margin-bottom .4rem
          .brand
            width 1.5rem
            height .9rem
            margin-right .3rem
            bg-img({p:1/3,positionX:0,positionY:-6})

          .name
            font-size .8rem
            font-weight bold
        .description
          height .6rem
          font-size .6rem
          font-weight 200
          margin-bottom .5rem
        .supports
          display flex
          line-height .6rem
          .icon
            width .6rem
            height .6rem
            margin-right .2rem
            bg-img({p:0.25,positionX:-10,positionY:0})

          .text
            height .6rem
            font-size .5rem
            font-weight 200
            margin-bottom 0
      .supports-count
        position absolute
        display flex
        right .6rem
        bottom .65rem
        line-height 1.2rem
        padding 0px .4rem
        border-radius .6rem
        background-color rgba(0,0,0,0.2)
        font-size .5rem
        .count
          font-width 200
          margin-right .1rem
        .icon-keyboard_arrow_right
          line-height 1.2rem
    .bulletin-wrapper
      display flex
      align-items center
      padding 0 .5rem
      height 1.4rem
      min-width : 0
      background-color red
      font-size .5rem
      background rgba(7,17,27,0.2)
      .icon
        flex 0 0 auto
        width 1.1rem
        height .6rem
        align-items center
        bg-img({p:1/3,positionX:-6,positionY:-6})
      .bulletin
        margin 0 .2rem
        font-weight 200
        padding 0
        ellipsis()
      .icon-keyboard_arrow_right
        align-items center
        color #fff

</style>
