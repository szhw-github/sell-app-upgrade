<template>
  <div class="ball-container">
    <transition
      @after-enter="afterEnter"
      @enter="enter"
      @before-enter="beforeEnter"
      name="drop"
    >
      <div class="ball"
           v-for="(ball,index) in balls"
           :key="index"
           v-show="ball.show">
        <div class="inner" ref="inner"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "DropBall",
    data () {
      return {
        balls:[
          {show:false,index:0}
        ],
        dropBalls:[]
      }
    },
    computed: {
      ...mapState([
        'elementClicked'
      ])
    },
    watch: {
      elementClicked() {
        let len = this.elementClicked.length
        let el = this.elementClicked[len - 1]
        this.drop(el)
      }
    },
    methods: {
      drop(el){
        for(var i=0;i<this.balls.length;i++){
          let ball = this.balls[i]
          if(!ball.show){
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = this.$refs.inner[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter(el) {
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = this.$refs.inner[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .ball-container
    position relative
    z-index 10
    .ball
      position fixed
      left 1.6rem
      bottom 1.1rem
      transform translate3d(0,0,0)
      transition all 0.3s cubic-bezier(0.49,-0.29,0.75,0.41)
      .inner
        width .8rem
        height .8rem
        border-radius 100%
        background rgb(0,160,220)
        transition all 0.3s linear
        transform translate3d(0,0,0)
</style>
