<template>
  <div class="menu" ref="menu" v-if="goods" @touchstart = "handleEvent('touch')">
    <ul>
      <li class="menu-item"
          v-for="(item,index) in goods"
          :class="{current:index === currentIndex}"
      >
        <div class="text border-bottom"
             :class="'goods_'+index"
             @click="handleMenuItemClick(index)"
        >
              <span class="icon"
                    v-if="item.type>0"
                    :class="classMap[item.type]"
              ></span>
          {{item.name}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    name: "VMenu",
    data () {
      return {
      }
    },
    computed: {
      maxMenuScrollY (){
        return -this.menuScroll.maxScrollY
      },
      halfMenuVisibleHeight () {
        let elementList = this.$refs.menu.getElementsByTagName('li')
        let menuHeight = elementList.length * elementList[0].clientHeight
        return 0.5*(menuHeight - this.maxMenuScrollY)
      },
      menuItemHeight () {
        let element = this.$refs.menu.getElementsByTagName('li')[0]
        return element.clientHeight
      },
      indexLength () {
        return this.$refs.menu.getElementsByTagName('li').length
      },
      ...mapState([
        'goods',
        'currentIndex'
      ])
    },
    methods: {
      handleMenuItemClick(index) {
        if (index !== this.currentIndex)
        this.changeClickIndex(index)
      },
      ...mapMutations([
        'changeClickIndex'
      ]),
      ...mapActions([
        'handleEvent'
      ])
    },
    watch: {
      currentIndex () {
        let upHeight = (this.currentIndex+1)*this.menuItemHeight
        let downHeight = (this.indexLength-this.currentIndex)*this.menuItemHeight
        if(upHeight <= this.halfMenuVisibleHeight+0.5*this.menuItemHeight && this.menuScroll.y!== 0) {
          this.menuScroll.scrollTo(0,0)
        }
        else if (downHeight <= this.halfMenuVisibleHeight+0.5*this.menuItemHeight && (this.menuScroll.y + this.maxMenuScrollY)){
          this.menuScroll.scrollTo(0,-this.maxMenuScrollY)
        }
        else if (upHeight > this.halfMenuVisibleHeight+0.5*this.menuItemHeight && downHeight > this.halfMenuVisibleHeight+0.5*this.menuItemHeight){
          this.menuScroll.scrollTo(0,-(upHeight-this.halfMenuVisibleHeight-0.5*this.menuItemHeight))
        }
      }
    },
    created() {
      this.classMap = ['decrease','discount','guarantee','invoice','special']
    },
    mounted() {
      this.menuScroll = new BScroll(this.$refs.menu,{click:true})
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus/variable.styl"
  @import "~stylus/mixins.styl"
  border-bottom()
  .menu
    overflow hidden
    position absolute
    top 8.7rem
    left 0
    bottom 2.3rem
    background $grey_bg
    .menu-item
      display table
      height 2.7rem
      padding 0 .6rem
      &.current
        background #fff
        .text
          font-size .6rem
          color rgb(7,17,27)
          line-height .7rem
          font-weight 500
      .text
        display table-cell
        vertical-align middle
        height 2.7rem
        line-height .7rem
        width 2.8rem
        padding 0 auto
        font-size .6rem
        font-weight 200
        color rgb(77,85,93)
      .icon
        display inline-block
        vertical-align middle
        width .6rem
        height .6rem
        margin-right .2rem
        background-size .6rem .6rem
        background-repeat no-repeat
        &.decrease
          bg-icon("decrease_3")
        &.discount
          bg-icon('discount_3')
        &.guarantee
          bg-icon('guarantee_3')
        &.invoice
          bg-icon('invoice_3')
        &.special
          bg-icon('special_3')


</style>
