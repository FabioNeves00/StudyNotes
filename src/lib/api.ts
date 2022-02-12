import { ErrorResponse, SuccessResponse } from './../pages/api/notes/search/[search]';
import axios, { AxiosResponse } from 'axios'

export default class RequestAPI {
  private path: string
  
  constructor(path: string) {
    this.path = path
  }
  async getNotes<T = any>(): Promise<AxiosResponse<T>>{
  return axios.get<T>(this.path);

  }
  async createUser<T = any>(): Promise<AxiosResponse<T>>{
  return axios.post<T>(this.path);

  }
  async getUser<T = any>(): Promise<AxiosResponse<T>>{
  return axios.get<T>(this.path);

  }
}
