

/** 读取或写入剪切板 */
export async function useClipboard(): Promise<any>
export async function useClipboard(value: string): Promise<any>
export async function useClipboard(...args: [value?: string]): Promise<any> {
  if (!(navigator && 'permissions' in navigator && 'clipboard' in navigator)) throw new Error('[useClipboard]: Clipboard is not supported!')


  if (args.length !== 0) {
    const value = args[0]

    if (typeof value !== 'string') throw new TypeError('[useClipboard]: value must be a string!')

    return navigator.permissions.query({ name: 'clipboard-write' as PermissionName })
      .then((status) => {
        if (status.state === 'denied') {
          throw new Error('[useClickboard]: clipboard-write denied.')
        }
        return navigator.clipboard.writeText(value)
      })
  } else {
    return navigator.permissions.query({ name: 'clipboard-read' as PermissionName })
      .then((status) => {
        if (status.state === 'denied') throw new Error('[useClickboard]: clipboard-read denied.')
        else return navigator.clipboard.readText()
      })
  }
}