<template>
  <div id="app" :class="[`wrap-${$route.name}`]">
    <transition-router>
      <router-view />
    </transition-router>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  mounted() {}
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
