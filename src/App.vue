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
  import { mapState,mapActions} from 'vuex'
  export default {
    name: "App",
    data () {
      return {
        currentIndex: 0,
        clickIndex: 0,
      }
    },
    computed:{
      ...mapState([
        'goods',
        'seller'
      ])
    },
    components: {
      VHeader,
      VTag,
      VShopcart
    }
  }
</script>
