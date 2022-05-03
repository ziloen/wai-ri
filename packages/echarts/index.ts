import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
import { init } from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'



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