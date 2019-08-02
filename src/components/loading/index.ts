import { Toast } from 'vant'

export default function loading(status: boolean): void {
  if (status) {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
    })
  } else {
    Toast.clear()
  }
}
