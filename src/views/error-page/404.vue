<template>
  <div class="flex column center pl-16 pr-16 error-page">
    <app-header />
    <h2 class="text-gold text-center fs-24">Page Not Found</h2>
    <p class="text-gray mt-16">{{ $route.path }}</p>

    <van-button class="mt-24" type="primary" block @click="back">
      {{ $t('common.back') }}
    </van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ErrorPage extends Vue {
  mounted() {
    // console.log('error-page is mounted')
  }

  back() {
    this.$router.back()
  }
}
</script>

<style lang="scss">
.error-page {
}
</style>
