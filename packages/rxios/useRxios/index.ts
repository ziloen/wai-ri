
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import AxiosStatic from 'axios'
import { Observable } from 'rxjs'


export function useRxios(instance: AxiosInstance) {
  return function rxios<ResponseData, ConfigData>(config: AxiosRequestConfig<ConfigData>) {
    return new Observable<AxiosResponse<ResponseData, ConfigData>>(observer => {
      const controller = new AbortController
      instance.request<ResponseData>({ ...config, signal: controller.signal })
        .then(val => (observer.next(val), observer.complete()))
        .catch(err => AxiosStatic.isCancel(err) ? observer.complete() : observer.error(err))

      return controller.abort.bind(controller)
    })
  }
}