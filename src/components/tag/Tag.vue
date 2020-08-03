<template>
    <div class="tag border-bottom">
      <router-link :to="item.url" class="item"
                   v-for="item in navItemList"
                   :key="item.url"
      >
        {{item.text}}
      </router-link>
    </div>
</template>

<script>
    export default {
      name: "VTag",
      data () {
        return {
          navItemList: [
            {
              url: '/goods',
              text: '商品'
            },
            {
              url: '/ratings',
              text: '评价'
            },
            {
              url: '/seller',
              text: '商家'
            }
          ]
        }
      }
    }
</script>

<style lang="stylus" scoped>
  @import "~stylus/mixins.styl"
  border-bottom()
  .tag
    display flex
    .item
      line-height 2rem
      margin auto
      font-size .7rem
      color rgb(77,85,93)
</style>
