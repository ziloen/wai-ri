import type { Extensible } from '@wai-ri/shared'

export * from '@wai-ri/shared'
export * from './asyncDebounce'
export * from './backward'
export * from './bindAll'
export * from './bindSelf'
export * from './blockThread'
export * from './clamp'
export * from './collapseWhitespace'
export * from './cssCustomHighlight'
export * from './getAllKeys'
export * from './ignoreReject'
export * from './lerp'
export * from './map'
export * from './noop'
export * from './patternMatching'
export * from './pipe'
export * from './sleep'
export * from './switchLatest'
export * from './useEnum'



function iframeDownload(url: string, fileName = '') {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = 'about:blank'

  function iframeLoad() {
    const window = iframe.contentWindow
    if (!window) return

    const document = window.document
    const anchor = document.createElement('a')
    anchor.href = url
    // 不同源的地址 download 属性无效，需要服务端设置 Content-Disposition: attachment
    anchor.download = fileName
    anchor.rel = 'noopener'
    document.body.append(anchor)
    anchor.dispatchEvent(new MouseEvent('click', {
      view: window,
      bubbles: false
    }))

    window.setTimeout(() => {
      iframe.remove()
    }, 60000)
  }

  iframe.onload = iframeLoad
  document.body.append(iframe)
}