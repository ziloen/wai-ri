import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
import { init } from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'


/**
 * 挂载后生成，卸载后删除，深度监听dataOption
 * @param id 要挂载dom元素的id
 * @param initOption 初始化的图表选项，只会在挂载时使用一次
 * @param dataOption 数据选项，发生改变会重新 setOption
 */
export function useEcharts(id: string, initOption: EChartsOption, dataOption: Ref<EChartsOption>) {
  const chart: { value: ECharts | null } = {
    value: null
  }

  function resize() {
    chart.value?.resize()
  }

  onMounted(() => {
    const chartDom = globalThis.document.getElementById(id)
    if (!chartDom) return
    chart.value = init(chartDom)
    chart.value.setOption(initOption)
    globalThis.addEventListener('resize', resize)
    // watch 是否需要注销？
    watch(dataOption, (val) => {
      chart.value?.setOption(val, { replaceMerge: Object.keys(val) })
    }, { deep: true, immediate: true })
  })

  onBeforeUnmount(() => {
    globalThis.removeEventListener('resize', resize)
    chart.value?.dispose()
  })

  return chart
}