/**
 * 当前环境是否是微信浏览器
 */
export function isWeixinBrowser(): boolean {
  const ua = navigator.userAgent.toLowerCase()
  return /micromessenger/i.test(ua)
}

/**
 * @description 在APP中跳转APP页面的方法
 * @param route{string} 跳转地址
 * @param error{function, null} 错误回调
 * @param callback{string} 返回本页面时的回调方法名
 * @param replace{boolean}
 */
export function navAppPage(
  route: string,
  error = null,
  callback = '',
  replace = false,
) {
  callAppFc('navAppPage', { route, callback, replace }, error)
}

export function navWebPage(
  url: string,
  fullscreen = false,
  error = null,
  callback = '',
  replace = false,
) {
  callAppFc('navWebPage', { url, fullscreen, callback, replace }, error)
}

/**
 * @description 调用app方法
 * @param event{string} 方法名
 * @param params{object, string} 参数对象
 * @param error{Function} 抛出错误时的回调函数
 */
function callAppFc(event: any, params = {}, error: any = null) {
  if (!isWeixinBrowser()) {
    console.log(event, params, 'callAppFc')
    try {
      window[event]['postMessage'](JSON.stringify(params))
    } catch (err) {
      if (error) error()
      console.log(err, event)
    }
  }
}

/**
 * 获取图片资源
 */
export function getImg(name: string) {
  try {
    return () => import.meta.glob(`@/assets/images/${name}.png`)
  } catch (error) {
    console.log(error, 'getStaticImages', name, 'name')
    return ''
  }
}
