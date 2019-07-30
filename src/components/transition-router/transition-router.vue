<template>
  <!-- <div class="transition-router"> -->
  <transition :name="transitionName()">
    <slot v-if="$slots.default"></slot>
    <router-view v-else />
  </transition>
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TransitionRouter extends Vue {
  transitionName() {
    let name = 'slide-left'
    const { history, isBack } = this.$store.state.routeStack
    if (!isBack) {
      // 首次渲染不加载动画
      if (history.size < 2) return undefined
    } else {
      name = 'slide-right'
    }
    return name
  }
}
</script>

<style lang="scss">
.transition-router {
}
</style>
