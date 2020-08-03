<template>
  <div class="foods-wrapper" ref="foods" @touchstart.prevent = "handleEvent('touch')">
    <ul>
      <li class="category"
          v-for="(item,index_good) in goods"
          :ref="'goods_'+index_good"
      >
        <div class="head border-left">{{item.name}}</div>
        <div class="food-wrapper food-wrapper-hook">
          <div class="food"
               :class="{'border-top': index_food}"
               v-for="(food,index_food) in item.foods"
               :key="index_food"
          >
            <div class="link-to" @click="handleFoodClick(index_good,index_food)">
              <div class="img-wrapper">
                <img class="food-img" v-lazy ="food.image">
              </div>
              <div class="content">
                <div class="title">{{food.name}}</div>
                <div class="description" v-show="food.description!==''">{{food.description}}</div>
                <div class="sales">月售{{food.sellCount}}份 好评率{{food.rating}}% </div>
                <div class="price">
                  <span class="actual-price">¥{{food.price}}</span>
                  <span class="old-price" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </div>
            <div class="choose" v-if="countList.length">
              <div class="icon-remove_circle_outline"
                   v-show="countList[index_good][index_food]"
                   @click="handleClick(index_good,index_food, 'remove')"
              ></div>
              <div class="number"
                   v-show="countList[index_good][index_food]"
              >{{countList[index_good][index_food]}}</div>
              <div class="icon-add_circle"
                   @click="handleClick(index_good,index_food,'add')"
                   :ref="'icon_add_' + index_good + '_' + index_food"
              ></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <food-detail v-show="showFood" :food="food" :index="foodClickedIndex" @closeFoodDetail="closeFoodDetail"></food-detail>
  </div>
</template>

<script>
  import FoodDetail from "components/food-detail/FoodDetail"
  import BScroll from "better-scroll"
  import { mapState, mapMutations,mapActions} from 'vuex'
  export default {
    name: "VFoods",
    data () {
      return {
        foodItemHeightList:[],
        scrollY: 0,
        showFood: false,
        food: null,
        foodClickedIndex: {
          i:0,
          j:0
        }
      }
    },
    components: {
      FoodDetail
    },
    computed: {
      ...mapState([
        'goods',
        'countList',
        'currentIndex',
        'clickIndex'
      ]),
      scrollIndex() {
        let currentY = this.scrollY
        for (let i = 0; i < this.foodItemHeightList.length; i++) {
          if (currentY >= this.foodItemHeightList[i] && currentY < this.foodItemHeightList[i + 1]) {
            return i
          }
        }
        return 0
      }
    },
    watch: {
      scrollIndex () {
        this.changeCurrentIndex(this.scrollIndex)
      },
      clickIndex () {
        let element = this.$refs['goods_' + this.clickIndex][0]
        this.goodsScroll.scrollToElement(element)
      }
    },
    methods: {
      handleFoodClick(i,j) {
        this.showFood = true
        this.food = this.goods[i].foods[j]
        this.foodClickedIndex = {
          i,
          j
        }
      },
      handleClick(i, j, type) {
        let delta = type === 'add' ? 1 : -1
        let count = this.countList[i][j] + delta
        this.changeCount({
          i,
          j,
          count
        })
        if (type === 'add') {
          this.getElementClicked(this.$refs['icon_add_' + i +'_' + j][0])
        }
      },
      _getHeight () {
        let height =0
        this.foodItemHeightList.push(height)
        const foodsElements = this.$refs['foods'].getElementsByTagName("li")
        for(let i=0;i<foodsElements.length;i++ ){
          height += foodsElements[i].clientHeight
          this.foodItemHeightList.push(height)
        }
      },
      ...mapMutations([
        'changeCount',
        'addCount',
        'changeCurrentIndex',
        'getElementClicked'
      ]),
      ...mapActions([
        'handleEvent'
      ]),
      closeFoodDetail(){
        this.showFood =false
      }
    },
    mounted() {
      this._getHeight()
      this.goodsScroll = new BScroll(this.$refs.foods,{click:true,probeType: 3})
      this.$nextTick(() => {
        this.goodsScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus/variable.styl"
  .border-top
    &:before
      border-color rgba(7,17,27,0.1)
      border-width 2px
  .border-left
    &:before
      border-color #d9dde1
      border-width 5px
  .foods-wrapper
    overflow hidden
    position absolute
    top 8.7rem
    left 4rem
    right 0
    bottom 2.3rem
    .head
      padding-left .7rem
      font-size .6rem
      color rgb(147,153,159)
      line-height 1.2rem
      font-weight 700
      background $grey_bg
    .food-wrapper
      padding 0 .9rem
      .food
        padding .9rem 0
        position relative
        .link-to
          display flex
          .img-wrapper
            width 3rem
            height 3rem
            .food-img
              height 100%
              width 100%
              object-fit cover
          .content
            flex 1
            margin-left .5rem
            margin-top .1rem
            .title
              font-size .7rem
              color rgb(7,17,27)
              line-height .7rem
              margin-top .1rem
              margin-bottom .4rem
            .description
              font-size .5rem
              color rgb(147,153,159)
              line-height .6rem
              margin-bottom .4rem
            .sales
              font-size .5rem
              color rgb(147,153,159)
              line-height .5rem
              margin-bottom .4rem
            .actual-price
              font-size .5rem
              color red
              font-weight 700
              line-height 1.2rem
            .old-price
              font-size .5rem
              color rgb(147,153,159)
              font-weight 700
              line-height 1.2rem
              text-decoration line-through
        .choose
          display flex
          flex 0 0 auto
          position absolute
          right .25rem
          bottom .9rem
          height 1.2rem
          line-height 1.2rem
          font-size 1.2rem
          color rgb(0,160,220)
          .number
            font-size .5rem
            color rgb(147,153,159)
            width 1.2rem
            text-align center

</style>
