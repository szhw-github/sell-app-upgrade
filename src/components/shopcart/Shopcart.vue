<template>
  <div class="container">
    <cart-control v-show="showShopcartDetail"></cart-control>
    <div class="count" v-show="show">{{foodsTotalCount}}</div>
    <div class="shopcart">
      <div class="circle">
      </div>
      <div class="icon-wrapper" :class="{icon_wrapper_actived: show}" @click="handleEvent('click')">
        <span class="icon-shopping_cart icon" :class="{icon_actived: show}"></span>
      </div>
      <div class="total-price" :class="{'total-price-active': show}">¥{{totalPrice}}</div>
      <p class="text">另需配送费4元</p>
      <div class="buttom">¥20起送</div>
      <div class="buttom" :class="{buttom_actived: show}" v-show="show">去结算</div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex'
  import CartControl from 'components/cartcontrol/CartControl'
  export default {
    name: "VShopcart",
    components: {
      CartControl
    },
    computed: {
      ...mapGetters([
        'foodsSelected'
      ]),
      ...mapState([
        'showShopcartDetail',
        'totalPrice'
      ]),
      foodsTotalCount() {
        this.getTotalPrice()
        let count = 0
        for(let i = 0;i < this.foodsSelected.length; i++ ) {
          count += this.foodsSelected[i].count
        }
        return count
      },
      show() {
        return this.foodsSelected.length
      }
    },
    methods: {
      ...mapActions([
        'handleEvent',
        'getTotalPrice'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    z-index 10
    .count
      z-index 1
      position fixed
      left 2.2rem
      bottom 2.1rem
      width 1.2rem
      height .8rem
      border-radius .6rem
      text-align center
      color #fff
      font-size .45rem
      font-weight 700
      line-height .8rem
      background red
    .shopcart
      display flex
      position absolute
      bottom 0
      left 0
      right 0
      height 2.4rem
      line-height 2.4rem
      text-align center
      color rgba(255,255,255,0.4)
      background #141d27
      .circle
        position absolute
        left .6rem
        bottom .1rem
        height 2.8rem
        width 2.8rem
        background #141d27
        border-radius 50%
      .icon-wrapper
        position absolute
        left .9rem
        bottom .4rem
        height 2.2rem
        width 2.2rem
        background rgba(255,255,255,0.2)
        border-radius 50%
        line-height 2.4rem
      .icon_wrapper_actived
        background rgb(0, 160, 200)
      .icon
        font-size 1.2rem
        color rgba(255,255,255,0.4)
      .icon_actived
        color #fff
      .total-price
        font-size .8rem
        font-weight 700
        margin-left 4rem
        margin-right .6rem
      .total-price-active
        color #fff
      .text
        text-align left
        font-size .8rem
        font-weight 200
        padding-left .6rem
        padding-right .6rem
      .buttom
        position absolute
        right 0
        bottom 0
        height 2.4rem
        font-size .6rem
        font-weight 700
        width 5.25rem
        padding-left .4rem
        padding-right .4rem
        background rgba(255,255,255,0.2)
      .buttom_actived
        background red
        color #fff
        font-size .75rem

</style>
