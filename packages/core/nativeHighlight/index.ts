type Options = {
  ignoreCase?: boolean
  trim?: boolean
}


export function nativeHighlight(
  node: HTMLElement,
  text: string,
  {
    ignoreCase = true,
    trim = true
  }: Options = {}) {
  // if native highlight is not supported, return
  if (!CSS.highlights || typeof Highlight === 'undefined') return

  CSS.highlights.clear()

  if (trim) text = text.trim()
  if (ignoreCase) text = text.toLowerCase()

  const str = text

  if (!str) return

  const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)

  const allTextNodes = []

  let curr = treeWalker.nextNode()
  while (curr) {
    allTextNodes.push(curr)
    curr = treeWalker.nextNode()
  }

  const ranges = allTextNodes
    .map(node => ({
      node,
      text: trim
        ? ignoreCase
          ? node.textContent!.trim().toLowerCase()
          : node.textContent!.trim()
        : ignoreCase
          ? node.textContent!.toLowerCase()
          : node.textContent!
    }))
    .map(({ node, text }) => {
      const indices = []
      let startPos = 0
      while (startPos < text.length) {
        const index = text.indexOf(str, startPos)
        if (index === -1) break
        indices.push(index)
        startPos = index + str.length
      }

      // Create a range object for each instance of
      // str we found in the text node.
      return indices.map(index => {
        const range = new Range
        range.setStart(node, index)
        range.setEnd(node, index + str.length)
        return range
      })
    })

  // Create a Highlight object for the ranges.
  const searchResultsHighlight = new Highlight(...ranges.flat())

  // Register the Highlight object in the registry.
  CSS.highlights.set('search-word-highlight', searchResultsHighlight)
}
