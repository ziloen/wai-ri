import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'

export function renderTo(node: ReactNode, container: DocumentFragment | Element) {
  const tempFragment = document.createDocumentFragment()
  const root = createRoot(tempFragment)
  root.render(createPortal(node, container))
  return () => root.unmount()

  // 以下 react 16
  // import { render, unmountComponentAtNode } from 'react-dom'
  // const tempFragment = document.createDocumentFragment()
  // render(createPortal(node, container))
  // return () => unmountComponentAtNode(tempFragment)
}