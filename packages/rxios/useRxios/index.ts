
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import AxiosStatic from 'axios'
import { Observable } from 'rxjs'


export function createRxios(instance: AxiosInstance) {
  return function rxios<ResponseData, ConfigData>(config: AxiosRequestConfig<ConfigData>): Observable<AxiosResponse<ResponseData, ConfigData>> {
    return new Observable<AxiosResponse<ResponseData, ConfigData>>((observer) => {
      const controller = new AbortController

      instance.request<ResponseData>({ ...config, signal: controller.signal })
        .then((val: AxiosResponse<ResponseData, ConfigData>) => (observer.next(val), observer.complete()))
        .catch((err: unknown) => AxiosStatic.isCancel(err) ? observer.complete() : observer.error(err))

      return controller.abort.bind(controller)
    })
  }
}