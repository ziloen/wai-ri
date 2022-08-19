

/** 读取或写入剪切板 */
export async function useClipboard(): Promise<any>
export async function useClipboard(value: any): Promise<any>
export async function useClipboard(...args: any[]): Promise<any> {
  if (!(navigator && 'permissions' in navigator && 'clipboard' in navigator)) return Promise.reject(new Error('[useClipboard]: Clipboard is not supported!'))

  const value = args[0]

  if (args.length !== 0) {
    return navigator.permissions.query({ name: <any>'clipboard-write' })
      .then(status => {
        if (status.state === 'denied') return Promise.reject('[useClickboard]: clipboard-write denied.')
        else return navigator.clipboard.writeText(value)
      })
  }

  else {
    return navigator.permissions.query({ name: <any>'clipboard-read' })
      .then(status => {
        if (status.state === 'denied') return Promise.reject('[useClickboard]: clipboard-read denied.')
        else return navigator.clipboard.readText()
      })
  }
}