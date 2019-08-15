<template>
  <div class="search-role">
    <app-header />

    <van-cell-group class="mt-16" :border="false">
      <v-input placeholder="搜索..." left-icon="search" :value="$route.query.uticket"></v-input>
      <van-cell :title="classNameH" @click="openPicker" is-link />
    </van-cell-group>

    <van-cell-group class="mt-16" :border="false">
      <van-cell v-for="(v, i) in roles" :key="i" is-link @click="onSelect(v)">
        <img :src="`/avatars/${v}.jpg`" />
        <div class="ml-16">
          <h2>{{ v }}</h2>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Search extends Vue {
  className: string = ''
  groupIndex: number = 0
  roles: Array<string> = []

  mounted() {
    this.queryData()
  }

  get classNameH() {
    return this.className || '学级筛选'
  }

  onSelect(name: string) {
    this.$store.commit('searchRole/UPDATE_NAME', name)
    this.$store.dispatch('searchRole/queryTopicDetail').then(() => {
      this.$router.back()
    })
  }

  queryData() {
    $api.common.queryRoles().then(res => {
      if (!this.className || this.className === '全部') {
        for (const key in res) {
          const val = res[key]
          this.roles = this.roles.concat(val)
        }
      } else {
        this.roles = res[this.className]
      }
    })
  }

  openPicker() {
    $api.common.queryGroups().then(groups => {
      this.$picker
        .open({
          columns: ['全部', ...groups],
          defaultIndex: this.groupIndex,
        })
        .then(res => {
          this.groupIndex = res.index
          this.className = res.value
          this.queryData()
        })
    })
  }
}
</script>

<style lang="scss">
.search-role {
}
</style>
