# useEnum

类似TS的`enum`，但可用于`for..of`循环，且可双向访问

## 使用

```vue
<script lang="ts" setup>
import { useEnum } from '@wai-ri/core'
import { ref } from 'vue'

const myEnum = useEnum({
  "开启": 1,
  "关闭": 0,
  "维护": 2
} as const)

const serverState = ref(0)
</script>

<template>
  <span>更改状态</span>
  <el-select clearable v-model="serverState">
      <el-option
        v-for="[label, value] of myEnum"
        :key="label"
        :value="(value as any)"
        :label="label"
      />
  </el-select>

  <div>当前状态：{{ myEnum[serverState] }}</div>
</template>
```