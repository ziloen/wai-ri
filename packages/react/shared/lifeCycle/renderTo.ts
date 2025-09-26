import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'

export function renderTo(node: ReactNode, container: DocumentFragment | Element): () => void {
  const tempFragment = document.createDocumentFragment()
  const root = createRoot(tempFragment)
  root.render(createPortal(node, container))
  return () => root.unmount()
}