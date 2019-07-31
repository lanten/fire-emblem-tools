<template>
  <van-field
    :maxlength="maxlength"
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :class="{ 'v-input-focus': isFocus }"
    :left-icon="leftIcon"
    @focus="inputFocus"
    @blur="inputBlur"
    @input="v => $emit('input', v)"
  >
    <slot></slot>
    <slot slot="button" name="button"></slot>
  </van-field>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Input extends Vue {
  // van-field props 转发 https://youzan.github.io/vant/#/zh-CN/field
  // 根据需求自行添加
  @Prop({ type: [String, Number] }) readonly value!: string | number
  @Prop({ type: String }) readonly placeholder?: string
  @Prop({ type: String }) readonly type?: string
  @Prop({ type: String }) readonly leftIcon?: string
  @Prop({ type: Boolean }) readonly disabled?: boolean
  @Prop({ type: Boolean }) readonly readonly?: boolean
  @Prop({ type: [String, Number] }) readonly maxlength?: string | number

  isFocus: boolean = false

  inputFocus(e: FocusEvent) {
    this.isFocus = true
    this.$emit('focus', e)
  }

  inputBlur(e: FocusEvent) {
    this.isFocus = false
    this.$emit('blur', e)
  }
}
</script>

<style lang="scss">
.input {
}
</style>
