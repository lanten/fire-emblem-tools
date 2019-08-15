<template>
  <div class="home">
    <app-header />

    <van-cell-group class="mt-16">
      <van-cell title="茶会答案查询" :to="{ name: 'topic' }" is-link />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  mounted() {}
}
</script>
