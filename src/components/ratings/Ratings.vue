<template>
  <div class="ratings" ref="ratings" v-if="seller">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="24" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="24" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"
                    :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import {formatDate} from './../../common/js/date.js';
  import Star from 'components/star/Star';
  import { mapState, mapMutations,mapActions} from 'vuex'

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    name: 'Ratings',
    data() {
      return {
        selectType: ALL,
        onlyContent: true,
      }
    },
    computed:{
      ...mapState([
        'seller',
        'ratings'
      ])
    },
    watch:{
      seller() {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        })
      }
    },
    methods: {
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
      Star,
      split,
      ratingselect
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/mixins.styl"

  .ratings
    position: absolute
    top: 8.7rem
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: .9rem 0
      .overview-left
        flex: 0 0 6.85rem
        padding: .3rem 0
        width: 6.85rem
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center

        .score
          margin-bottom: .3rem
          line-height: 1.4rem
          font-size: 1.2rem
          color: rgb(255, 153, 0)
        .title
          margin-bottom: .4rem
          line-height: .6rem
          font-size: .6rem
          color: rgb(7, 17, 27)
        .rank
          line-height: .5rem
          font-size: .5rem
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: .3rem 0 .3rem 1.2rem
        .score-wrapper
          margin-bottom: .4rem
          font-size: 0
          .title
            display: inline-block
            line-height: .9rem
            vertical-align: top
            font-size: .6rem
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            vertical-align: top
          .score
            display: inline-block
            line-height: .9rem
            vertical-align: top
            font-size: .6rem
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: .9rem
            font-size: .6rem
            color: rgb(7, 17, 27)
          .delivery
            margin-left: .6rem
            font-size: .6rem
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 .9rem
      .rating-item
        display: flex
        padding: .9rem 0
        border-bottom-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 1.4rem
          width: 1.4rem
          margin-right: .6rem
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: .2rem
            line-height: .6rem
            font-size: .5rem
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: .3rem
            font-size: 0
            .star
              display: inline-block
              margin-right: .3rem
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: .6rem
              font-size: .5rem
              color: rgb(147, 153, 159)
          .text
            margin-bottom: .4rem
            line-height: .9rem
            color: rgb(7, 17, 27)
            font-size: .6rem
          .recommend
            line-height: .8rem
            font-size: 0
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 .4rem .2rem 0
              font-size: .45rem
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0 .3rem
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: .6rem
            font-size: .5rem
            color: rgb(147, 153, 159)
</style>
