interface State {
  name: string
  topicDetail: TopicDetailItem
}

export default {
  namespaced: true,

  state: {
    name: '',
    topicDetail: {},
  },

  mutations: {
    UPDATE_NAME(state: State, name: string) {
      state.name = name
    },

    UPDATE_TOPIC_DETAIL(state: State, detail: TopicDetailItem) {
      state.topicDetail = detail
    },
  },

  actions: {
    queryTopicDetail({ commit, state }: any) {
      return $api.common.queryTopicDetails().then(res => {
        commit('UPDATE_TOPIC_DETAIL', res[state.name])
      })
      // const nextKey = to.fullPath
      // const fromKey = from.fullPath
      // if (state.history.has(nextKey)) {
      //   const current = state.history.get(fromKey)
      //   const next = state.history.get(nextKey)
      //   const isBack = current.index > next.index
      //   commit('SWITCH', current)
      //   commit('SET_BACK', isBack)
      //   if (isBack) commit('DELETE', fromKey)
      // } else {
      //   commit('PUSH', { key: nextKey, route: to })
      //   commit('SET_BACK', false)
      // }
      // return state.isBack
    },
  },
}
