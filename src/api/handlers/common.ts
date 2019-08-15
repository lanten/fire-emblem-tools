// 获取学级列表
export function queryGroups(): Promise<Array<string>> {
  return $api.request('class.json')
}

// 获取话题详情
export function queryTopicDetails(): Promise<Array<any>> {
  return $api.request('detail.json')
}

// 获取所有话题
export function queryTopics(): Promise<Array<string>> {
  return $api.request('topics.json')
}

// 获取所有角色
export function querySourceData(): Promise<Array<DataSourceItem>> {
  return $api.request('source.json')
}

// 获取所有角色
export function queryRoles(): Promise<Array<string>> {
  return $api.request('roles.json')
}
