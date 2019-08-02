declare namespace $api {
  /**
   * 发起一个请求
   * @param service 后端接口 service
   * @param params
   * @param optionsSource
   */
  function request(
    service: string,
    params?: RequestParams,
    options?: RequestOptions
  ): Promise<RequestRes | any>

  namespace common {
    /**
     * 获取学级列表
     */
    function queryGroups(): Promise<Array<string>>

    /**
     * 获取话题答案
     */
    function queryTopicDetails(): Promise<Array<any>>
  }
}
