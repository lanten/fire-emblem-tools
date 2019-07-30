<template>
  <div class="demo">
    <app-header title="demo" />

    <br />

    <van-cell-group class="mt-16" :border="false">
      <v-input placeholder="uticket" :value="$route.query.uticket"></v-input>
      <van-cell title="wallet" to="/wallet" is-link />
      <van-cell title="单元格" value="demo" to="/demo" is-link arrow-direction="left" />
      <van-cell title="单元格" value="about" to="about" is-link />
      <van-cell title="单元格" value="default" />
      <van-cell class="touch">
        <p class="text-gold">自定义内容</p>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="card mt-16">
      <van-cell title="单元格" value="home" to="/" is-link arrow-direction="down" />
      <van-cell title="单元格" value="demo" to="/demo" is-link arrow-direction="left" />
      <van-cell title="单元格" value="about" to="about" is-link />
      <van-cell title="单元格" value="default" />
      <van-cell class="touch">
        <p class="text-gold">自定义内容</p>
      </van-cell>
    </van-cell-group>

    <div class="card mt-16">
      <van-button type="default" block>默认按钮</van-button>
      <br />
      <van-button type="primary" block>主要按钮</van-button>
      <br />
      <van-button type="primary" block disabled>Disabled</van-button>
      <br />
      <van-button type="default" block disabled>Disabled</van-button>
      <br />
      <van-button type="primary" block disabled loading>Loading</van-button>
    </div>

    <div class="card mt-16">card</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Demo extends Vue {
  mounted() {
    console.log('demo is mounted')
  }
}
</script>

<style lang="scss">
.demo {
}
</style>
