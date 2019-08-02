declare interface RequestParams {
  [key: string]: any
}

declare interface RequestRes {
  [key: string]: any
}

declare interface RequestOptions {
  method?: string
  url?: string
  timeout?: number
  loading?: boolean
  errorType?: string | boolean
  headers?: Headers
}

declare interface TopicDetail {
  group: string
  items: {
    [name: string]: TopicDetailItem
  }
}

declare interface TopicDetailItem {
  topics: Array<number>
  tea: Array<string>
}
