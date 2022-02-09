import axios, { AxiosResponse } from 'axios'

export default async function api<T = any>(path: string): Promise<AxiosResponse<any>> {
  return axios.get<T>(path);
}
