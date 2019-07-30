import cookie from 'js-cookie'
const { userAgent, platform } = navigator

const isMac = ['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].includes(platform)
const isWin = ['Win32', 'Windows'].includes(platform)

const systemInfo: SystemInfo = {
  platform,
  language: cookie.get('language') || 'zh',
  isMac,
  isWin,
  pc: isMac || isWin,
  ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
  android: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1, //android终端
  ipad: userAgent.indexOf('iPad') > -1, //是否iPad
  iphone: userAgent.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
  iphoneX:
    /iphone/gi.test(window.navigator.userAgent) &&
    window.devicePixelRatio !== 0 &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 375 &&
    window.screen.height === 812,
}

export default systemInfo
