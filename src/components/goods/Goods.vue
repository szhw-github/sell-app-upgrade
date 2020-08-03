<template>
  <div>
    <v-menu></v-menu>
    <v-foods></v-foods>
    <drop-ball></drop-ball>
  </div>
</template>

<script>
  import VFoods from 'components/foods/Foods'
  import VMenu from 'components/menu/Menu'
  import DropBall from "components/ball/DropBall"
  export default {
    name: "Goods",
    components: {
      VFoods,
      VMenu,
      DropBall
    }
  }
</script>

<style lang="stylus" scoped>

</style>
