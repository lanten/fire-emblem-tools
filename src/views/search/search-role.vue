<template>
  <div class="search-role">
    <app-header />

    <van-cell-group class="mt-16" :border="false">
      <v-input placeholder="搜索..." left-icon="search" :value="$route.query.uticket"></v-input>
      <van-cell :title="groupNameH" @click="openPicker" is-link />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Search extends Vue {
  mounted() {}

  groupName: string = ''
  groupIndex: number = 0

  get groupNameH() {
    return this.groupName || '学级筛选'
  }

  queryData() {
    // this.$axios.get()
  }

  openPicker() {
    $api.common.queryGroups().then(groups => {
      this.$picker
        .open({
          columns: groups,
          defaultIndex: this.groupIndex,
        })
        .then(res => {
          this.groupIndex = res.index
          this.groupName = res.value
        })
    })
  }
}
</script>

<style lang="scss">
.search-role {
}
</style>
