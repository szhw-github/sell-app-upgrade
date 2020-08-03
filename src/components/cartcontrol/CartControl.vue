<template>
  <div class="shopcart-detail"
       ref="shopcart-detail"
  >
    <div class="head border-bottom">
      <span class="text">购物车</span>
      <span class="clear" @click="hangdleClear">清空</span>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="foods">
        <div class="item border-bottom" v-for="item in foodsSelected">
          <img class="item-img" :src="goods[item.i].foods[item.j].image">
          <span class="name">{{goods[item.i].foods[item.j].name}}</span>
          <span class="price">¥{{goods[item.i].foods[item.j].price}}</span>
          <span class="remove icon-remove_circle_outline" @click="handleClick(item.i,item.j, 'remove')"></span>
          <span class="number">{{countList[item.i][item.j]}}</span>
          <span class="add icon-add_circle" @click="handleClick(item.i,item.j, 'add')"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  export default {
    name: "CartControl",
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'foodsSelected'
      ]),
      ...mapState([
        'goods',
        'countList',
        'showShopcartDetail'
      ])
    },
    watch: {
      foodsSelected () {
        this.$nextTick(()=>{
          if (this.scroll) {
            this.scroll.destroy()
          }
          this.scroll = new BScroll(this.$refs.wrapper,{click:true})
        })
      },
      showShopcartDetail() {
        this.$nextTick(()=>{
          if (this.showShopcartDetail) {
            if (this.scroll) {
              this.scroll.destroy()
            }
            this.scroll = new BScroll(this.$refs.wrapper,{click:true})
          }
        })
      }
    },
    methods: {
      ...mapMutations([
        'changeCount',
        'initCountList'
      ]),
      ...mapActions([
        'handleEvent'
      ]),
      handleClick(i, j, type) {
        let delta = type === 'add' ? 1 : -1
        let count = this.countList[i][j] + delta
        this.changeCount({
          i: i,
          j: j,
          count:count
        })
      },
      hangdleClear() {
        this.handleEvent('clear')
        this.initCountList()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus/mixins.styl"
  border-bottom()
  .shopcart-detail
    position absolute
    bottom 2.4rem
    left 0
    right 0
    z-index 0
    max-height 15.275rem
    background #fff
    .head
      display flex
      line-height 2rem
      padding-left .9rem
      padding-right .9rem
      background #f3f5f7
      .text
        flex 1
        text-align left
        color rgb(7,17,27)
      .clear
        flex 1
        text-align right
        color rgb(0,160,200)
    .wrapper
      overflow hidden
      max-height 13.275rem
      .foods
        padding 0 .9rem
        color grey
        .item
          display flex
          height 2.9rem
          align-items center
          .item-img
            width 2rem
            height 2rem
            margin-right .2rem
            object-fit cover
          .name
            flex 1
            text-align left
            font-size .7rem
            color rgb(7,17,27)
            margin-right .9rem
          .price
            color red
            font-size .7rem
            font-weight 700
            margin-right .6rem
          .remove
            color rgb(0,160,220)
            font-size 1.2rem
          .add
            color rgb(0,160,220)
            font-size 1.2rem
          .number
            font-size .5rem
            color rgb(147,153,159)
            margin auto .6rem
</style>
