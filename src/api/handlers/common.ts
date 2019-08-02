// 获取学级列表
export function queryGroups(): Promise<Array<string>> {
  return $api.request('groups.json')
}

// 获取话题答案
export function queryTopicDetails(): Promise<Array<any>> {
  return $api.request('detail.json')
}
