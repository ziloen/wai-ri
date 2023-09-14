import type { Simplify, Writable } from '@wai-ri/shared'
import { AllowedComponentProps, Component, ComponentCustomProps, VNodeProps } from 'vue'

// type ComponnetInternalPropKeys = keyof AllowedComponentProps | keyof ComponentCustomProps | keyof VNodeProps
type InternalPropKeys = keyof AllowedComponentProps | keyof VNodeProps

/**
 * 提取组件 Props 类型
 * ```ts
 * import { NButton } from 'naive-ui'
 * type ButtonProps = ComponentProps<typeof NButton>
 * ```
 */
export type ComponentProps<T extends Component> =
  T extends new () => { $props: infer DirtyProps }
    ? Simplify<Writable<Omit<DirtyProps, InternalPropKeys>>>
    : never