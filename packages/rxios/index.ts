
import { Observable } from 'rxjs'
import AxiosStatic from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'


export function useRxios(instance: AxiosInstance) {
  return function rxios<Data, Config>(config: AxiosRequestConfig<Config>) {
    return new Observable<AxiosResponse<Data, Config>>(observer => {
      const controller = new AbortController()
      instance.request<Data>({ ...config, signal: controller.signal })
        .then(val => (observer.next(val), observer.complete()))
        .catch(err => AxiosStatic.isCancel(err) ? observer.complete() : observer.error(err))
      return controller.abort.bind(controller)
    })
  }
}