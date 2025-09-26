// browser allowed canvas size data source: https://github.com/jhildenbiddle/canvas-size#test-results
// https://jhildenbiddle.github.io/canvas-size/#/?id=test-results

type Browser =
  | 'chrome'
  | 'firefox'
  | 'safari'
  | 'edge'
  | 'other'

/** canvas max width brower allowed */
const canvasMaxWidth = {
  chrome: 65_535,
  edge: 65_535,
  firefox: 32_767,
  safari: 4_194_303,
  other: 32_767
} satisfies Record<Browser, number>

/** canvas max height browser allowed */
const canvasMaxHeight = {
  chrome: 65_535,
  edge: 65_535,
  firefox: 32_767,
  safari: 8_388_607,
  other: 32_767
} satisfies Record<Browser, number>

/** canvs max area browser allowed */
const canvasMaxArea = {
  chrome: 268_435_456,
  edge: 268_435_456,
  firefox: 124_992_400,
  safari: 268_435_456,
  other: 124_992_400
} satisfies Record<Browser, number>


/**
 * check if the canvas size allowed in browser
 *
 * data source: [jhildenbiddle/canvas-size](https://github.com/jhildenbiddle/canvas-size#test-results)
 */
export function checkCanvasSize(width: number, height: number, browser: Browser): boolean {
  if (width > canvasMaxWidth[browser]) return false
  if (height > canvasMaxHeight[browser]) return false
  if (width * height > canvasMaxArea[browser]) return false
  return true
}