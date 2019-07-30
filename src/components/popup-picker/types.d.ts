declare interface PopupPickerClass {
  /**
   * 快速弹出一个选择器
   * @param options
   */
  open(options: PopupPickerOptions): Promise<PopupPickerRes>

  /**
   * 关闭选择器 (唯一)
   */
  close(): void

  /**
   * pickerRef
   */
  pickerRef: any
}

declare interface PopupPickerOptions {
  columns: Array<any> // 数据列
  title?: string // 标题
  valueKey?: string
  defaultIndex?: number
  onChange?(res: PopupPickerRes): void
}

interface PopupPickerRes {
  values: Array<any>
  indexes: Array<number>
  value: string | any
  index: number
}
