import Vue, { VNode } from 'vue'
import { AxiosStatic } from 'axios'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  interface Window {
    $root: Vue
    WebViewJavascriptBridge: any
    WVJBCallbacks: any
    webkit: any
    [key: string]: any
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $picker: PopupPickerClass
    $axios: AxiosStatic
    $loading(status: boolean): void
  }
}
