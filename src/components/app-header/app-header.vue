<template>
  <div
    class="app-header-wrap"
    :class="{
      'header-fixed': fixed === true || fixed === 'fixed',
      'header-absolute': fixed === 'absolute',
    }"
    :style="{ zIndex, height: `${height + statusBarHeightH}px` }"
  >
    <div
      class="flex center-v app-header"
      :style="{
        background: backgroundH,
        height: `${height + statusBarHeightH}px`,
        paddingTop: `${statusBarHeightH}px`,
      }"
    >
      <div class="flex-1 flex center-v">
        <van-icon
          v-if="showBackH"
          name="arrow-left"
          class="back-icon left-item fs-16"
          :class="backIcon"
          @click="goBack"
        />
        <span class="flex-1 flex-block"></span>
        <div class="app-header-content flex-1">
          <slot name="title" class="slot-content">
            <h2 class="fs-18 text-center">{{ titleH }}</h2>
          </slot>
        </div>
        <div class="right-item">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AppHeader extends Vue {
  // 标题
  @Prop({ type: String }) readonly title?: string
  // 导航栏高度
  @Prop({ type: [String, Number], default: 56 }) readonly height?: string | number
  // 状态栏高度
  @Prop({ type: [String, Number], default: 20 }) readonly statusBarHeight?: string | number

  // 返回图标
  @Prop({ type: String, default: 'icon-back' }) readonly backIcon?: string
  // 是否显示返回图标
  @Prop({ type: Boolean, default: false }) readonly showBack?: boolean

  // 导航栏背景颜色
  @Prop({ type: String, default: '#212125' }) readonly background?: string
  // 是否透明
  @Prop({ type: Boolean, default: false }) readonly transparent?: boolean
  // 是否固定
  @Prop({ type: Boolean, default: true }) readonly fixed?: boolean
  // 导航栏层级
  @Prop({ type: Number, default: 99 }) readonly zIndex?: boolean

  // 点击返回按钮执行的函数
  @Prop(Function) readonly onBack?: Function

  showBackground: boolean = false

  mounted() {
    if (this.transparent) {
      const contentEl = this.$parent.$vnode.elm || document.body
      contentEl.addEventListener('scroll', ({ target: { scrollTop } }: any) => {
        const showBackground = scrollTop >= 20
        if (showBackground !== this.showBackground) this.showBackground = showBackground
      })
    }
  }

  get showBackH(): boolean {
    if (this.showBack) {
      return true
    } else {
      const { history } = this.$store.state.routeStack
      return history.size > 1
    }
  }

  get titleH() {
    return this.title || document.title
  }

  get backgroundH() {
    if (this.transparent) {
      return this.showBackground ? this.background : 'transparent'
    } else {
      return this.background
    }
  }

  get statusBarHeightH() {
    if ($app.systemInfo.iphoneX) return Number(this.statusBarHeight) + 12
    return this.statusBarHeight
  }

  goBack() {
    if (this.onBack) {
      this.onBack()
    } else {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
$height: 76px;
.app-header-wrap {
  height: $height;
  position: relative;
  &.header-fixed {
    .app-header {
      box-sizing: border-box;
      position: fixed;
      z-index: 10;
      top: 0;
      left: 0;
      width: 100vw;
    }
  }
  &.header-absolute {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    .app-header {
      width: 100vw;
    }
  }
}
.app-header {
  transition: background-color 0.4s;
  height: $height;
  .back-icon {
    padding: 16px;
  }
  .app-header-content {
    position: absolute;
    z-index: 0;
    left: 0;
    width: 100vw;
  }
  .flex-block {
    position: relative;
    z-index: -2;
  }
  .right-item {
    position: relative;
    z-index: 6;
  }
  .left-item {
    position: relative;
    z-index: 5;
  }
  .slot-content {
    position: relative;
    z-index: 3;
  }
}
</style>
