import Vue from 'vue'
import i18n from '@/lang'

const ID = 'v-popup-picker'

class PopupPicker {
  private $contentRoot: any
  private $content: any

  public pickerRef: any
  open(options: PopupPickerOptions) {
    this.createContent()
    this.pickerRef = this.$content.$refs.vanPickerRef
    return this.$content.open(options)
  }

  close() {
    this.$content.close()
  }

  // 创建 DOM
  createContent() {
    this.$contentRoot = document.getElementById(ID) // DOM 根节点
    if (!this.$contentRoot) {
      this.$contentRoot = document.createElement('div')
      this.$contentRoot.id = ID
      document.body.appendChild(this.$contentRoot)
    }
    this.$content = undefined // vue 实例

    this.$content = new Vue({
      data() {
        return {
          show: false,
          columns: [],
          valueKey: undefined,
          defaultIndex: 0,
          title: '请选择',
          activeValue: undefined,
          activeIndex: 0,
        }
      },

      render(h) {
        return (
          <div class="popup-picker">
            <van-popup v-model={this.show} position="bottom">
              <div class="pl-16 pb-8 pr-16 pt-16 text-center" onClick={this.close}>
                <p class="icon icon-xia fs-32 text-gray mb-12" />
                <p class="text-light fs-14">{this.title}</p>
              </div>
              <van-picker
                ref="vanPickerRef"
                value-key={this.valueKey}
                columns={this.columns}
                onChange={this.onPickerChange}
              />

              <div class="pl-16 pb-16 pr-16 pt-8">
                <van-button onClick={this.onChange} type="primary" block>
                  {i18n.t('common.submit')}
                </van-button>
              </div>
            </van-popup>
          </div>
        )
      },

      methods: {
        onPickerChange(picker: any, value: any, index: any) {
          this.activeValue = value
          this.activeIndex = index
        },

        onChange() {},

        open({ onChange, valueKey, title, columns, defaultIndex }: any) {
          this.columns = columns
          if (title) this.title = title
          if (valueKey) this.valueKey = valueKey
          if (defaultIndex) this.defaultIndex = defaultIndex
          if (Array.isArray(columns)) {
            this.activeValue = columns[0]
          }
          this.$nextTick().then(() => {
            this.show = true
          })

          return new Promise(resolve => {
            this.onChange = () => {
              const { vanPickerRef }: any = this.$refs
              const res = {
                values: vanPickerRef.getValues(),
                indexes: vanPickerRef.getIndexes(),
                value: this.activeValue,
                index: this.activeIndex,
              }
              resolve(res)
              if (typeof onChange === 'function') onChange(res)
              this.close()
            }
          })
        },

        close() {
          this.show = false
        },
      },
    }).$mount(this.$contentRoot)
  }
}

const $picker = new PopupPicker()

export default $picker
