<template>
  <div class="search">
    <app-header />

    <van-cell-group class="mt-16">
      <van-cell :title="name || '选择角色'" :to="{ name: 'search-role' }" is-link />
      <!-- <van-cell title="选择话题" :to="{ name: 'search-topic' }" is-link /> -->
    </van-cell-group>

    <div v-if="topicDetail.tea" class="p-16">
      <p class="fs-12 text-gray mb-16">喜欢的茶叶:</p>
      <van-tag v-for="(v, i) in topicDetail.tea" :key="i" type="success" class="mr-4 mt-4">
        {{ v }}
      </van-tag>
    </div>

    <van-cell-group v-if="topicDetail.topics" class="pt-16">
      <p class="fs-12 text-gray pl-16">喜欢的话题:</p>
      <van-cell v-for="(v, i) in topicDetail.topics" :key="i" :title="topics[v]" />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Search extends Vue {
  topicDetail: TopicDetailItem = this.$store.state.searchRole.topicDetail
  name: string = this.$store.state.searchRole.name
  topics: Array<string> = []
  mounted() {
    this.queryTopics()
  }

  queryTopics() {
    $api.common.queryTopics().then(res => {
      this.topics = res
    })
  }
}
</script>

<style lang="scss">
.search {
}
</style>
