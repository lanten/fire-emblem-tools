<template>
  <div class="p-16 home">
    <app-header title="home" />

    home
    <div class="mt-16">
      <router-link to="/demo">demo</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  mounted() {}
}
</script>
