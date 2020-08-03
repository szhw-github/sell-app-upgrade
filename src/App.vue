<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tag></v-tag>
    <router-view v-if="goods"></router-view>
    <v-shopcart></v-shopcart>
  </div>
</template>

<script>
  import VHeader from 'components/header/Header'
  import VTag from 'components/tag/Tag'
  import VShopcart from 'components/shopcart/Shopcart'
  import axios from "axios";
  import {mapState,mapMutations} from 'vuex'
  export default {
    name: "App",
    data () {
      return {
        seller: null,
        goods: null,
        currentIndex: 0,
        clickIndex: 0,
      }
    },
    components: {
      VHeader,
      VTag,
      VShopcart
    },
    computed: {
      ...mapState([
        'countList'
      ])
    },
    methods: {
      getSellerInfo () {
        axios.get('/api/seller.json')
          .then(res=>{
            this.seller = res.data.seller
            this.getSeller(this.seller)
          })
      },
      getGoodsInfo () {
        axios.get('/api/goods.json')
          .then(res=>{
            this.goods = res.data.goods
            this.getGoods(res.data.goods)
            if (this.countList.length === 0) {
              this.initCountList()
            }
          })
      },
      getRatingsInfo () {
        axios.get('/api/ratings.json')
          .then(res=>{
            this.ratings = res.data.ratings
            this.getRatings(this.ratings)
          })
      },
      ...mapMutations([
        'getGoods',
        'getSeller',
        'getRatings',
        'initCountList'
      ])
    },
    mounted() {
      this.getSellerInfo()
      this.getGoodsInfo()
      this.getRatingsInfo()
    }
  }
</script>

<style>
</style>
