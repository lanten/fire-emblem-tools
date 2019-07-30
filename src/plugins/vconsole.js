import Vconsole from 'vconsole'

const { VUE_APP_BUILD_ENV } = process.env

if (VUE_APP_BUILD_ENV !== 'prod' && !$app.systemInfo.pc) {
  window.vconsole = new Vconsole()
}
