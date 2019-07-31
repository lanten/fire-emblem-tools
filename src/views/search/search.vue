<template>
  <div class="search">
    <app-header />

    <van-cell-group class="mt-16" :border="false">
      <van-cell title="选择角色" to="/search/search-role" is-link />
      <van-cell title="选择话题" to="/search/search-topic" is-link />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Search extends Vue {
  mounted() {
    console.log('search is mounted')
  }
}
</script>

<style lang="scss">
.search {
}
</style>
