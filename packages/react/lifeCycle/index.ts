import { useEffect } from 'react'


export function onMounted(fn: () => any) {
  useEffect(fn, [])
}


export function onUnMounted(fn: () => any) {
  useEffect(() => fn, [])
}