import { noop } from '../noop'

type Options = {
  /**
   * @default false
   */
  caseSensitive?: boolean
  /**
   * @default true
   */
  trim?: boolean

  /**
   * 
   */
  name: string
}

/**
 * 
 * @param node 
 * @param searchText 
 * @param options 
 * @returns function to remove the highlight
 */
export function nativeHighlight(
  node: HTMLElement,
  searchText: string,
  options: Options
) {
  if (!CSS.highlights || typeof Highlight === 'undefined')
    return noop as () => void

  const { caseSensitive = false, trim = true, name } = options

  if (trim) searchText = searchText.trim()
  if (!caseSensitive) searchText = searchText.toLowerCase()

  if (!searchText) return noop as () => void

  const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)

  const textNodes = []
  let curr = treeWalker.nextNode()
  while (curr) {
    textNodes.push(curr)
    curr = treeWalker.nextNode()
  }

  const ranges = textNodes.flatMap(node => {
    if (!node.textContent) return []

    let textContent = node.textContent
    if (!caseSensitive) textContent = textContent.toLowerCase()

    const indices = []
    let startPos = 0
    while (startPos < textContent.length) {
      const index = textContent.indexOf(searchText, startPos)
      if (index === -1) break
      indices.push(index)
      startPos = index + searchText.length
    }

    return indices.map(index => {
      const range = new Range()
      range.setStart(node, index)
      range.setEnd(node, index + searchText.length)
      return range
    })
  })

  const searchResultsHighlight = new Highlight(...ranges)

  CSS.highlights.set(name, searchResultsHighlight)

  return () => CSS.highlights!.delete(name)
}
