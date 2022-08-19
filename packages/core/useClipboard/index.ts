

/** 读取或写入剪切板 */
export async function useClipboard(): Promise<any>
export async function useClipboard(value: any): Promise<any>
export async function useClipboard(...args: any[]): Promise<any> {
  if (!(navigator && 'permissions' in navigator && 'clipboard' in navigator)) return Promise.reject(new Error('[useClipboard]: Clipboard is not supported!'))

  const value = args[0]

  if (args.length !== 0) {
    type N = PermissionDescriptor
    // const permissions = navigator.permissions.query('clip')
    return navigator.clipboard.writeText(value)
  }

  else {
    navigator.permissions.query({ name: 'clipboard-read' as any })
      .then(status => {
        status.state
      })
    navigator.clipboard.readText()
  }
}