<template>
  <transition name="move" v-if="food">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img class="food-img" :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>

          <transition name="fade">
            <div @click="addFirst" class="buy" v-show="!countList[index.i][index.j]">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType"
                        :onlyContent="onlyContent" :desc="desc"
                        :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                  class="rating-item border-bottom-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import {formatDate} from 'common/js/date.js';
  import { mapState, mapMutations,mapActions} from 'vuex'

  const ALL = 2;

  export default {
    name: 'FoodDetail',
    props: {
      food: {
        type: Object
      },
      index: Object
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    computed:{
      ...mapState([
        'countList'
      ])
    },
    methods: {
      ...mapMutations([
        'changeCount'
      ]),
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.$emit('closeFoodDetail')
      },
      addFirst() {
        let {i,j} = this.index
        let count = this.countList[i][j] +1
        this.changeCount({
          i,
          j,
          count
        })
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      addFood(target) {
        this.$emit('add', target);
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      split,
      ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/mixins.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 2.4rem
    z-index: 0
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      .food-img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        object-fit cover
      .back
        position: absolute
        top: .5rem
        left: 0
        .icon-arrow_lift
          display: block
          padding: .5rem
          font-size: 1rem
          color: #fff

    .content
      position: relative
      padding: .9rem
      .title
        line-height: .7rem
        margin-bottom: .4rem
        font-size: .7rem
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: .9rem
        line-height: .5rem
        height: .5rem
        font-size: 0
        .sell-count, .rating
          font-size: .5rem
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: .6rem
      .price
        font-weight: 700
        line-height: 1.2rem
        .now
          margin-right: .4rem
          font-size: .7rem
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: .5rem
          color: rgb(147, 153, 159)

      .buy
        position: absolute
        right: .9rem
        bottom: .9rem
        z-index: 10
        height: 1.2rem
        line-height: 1.2rem
        padding: 0 .6rem
        box-sizing: border-box
        border-radius: .6rem
        font-size: .5rem
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding: .9rem
      .title
        line-height: .7rem
        margin-bottom: .3rem
        font-size: .7rem
        color: rgb(7, 17, 27)
      .text
        line-height: 1.2rem
        padding: 0 .4rem
        font-size: .6rem
        color: rgb(77, 85, 93)
    .rating
      padding-top: .9rem
      .title
        line-height: .7rem
        margin-left: .9rem
        font-size: .7rem
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 .9rem
        .rating-item
          position: relative
          padding: .8rem 0
          border-bottom-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: .8rem
            line-height: .6rem
            font-size: 0
            .name
              display: inline-block
              margin-right: .3rem
              vertical-align: top
              font-size: .5rem
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: .3rem
            line-height: .6rem
            font-size: .5rem
            color: rgb(147, 153, 159)
          .text
            line-height: .8rem
            font-size: .6rem
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: .2rem
              line-height: .8rem
              font-size: .6rem
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: .8rem 0
          font-size: .6rem
          color: rgb(147, 153, 159)
</style>
