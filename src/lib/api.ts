import { INote } from "./../models/User";
import axios, { AxiosResponse } from "axios";

class RequestAPI {
  private baseURL: string = "http://localhost:3000/api"
  async getNotes<T = any>(path: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(this.baseURL + path);
  }
  async createNote<T = any>(
    path: string,
    body: INote
  ): Promise<AxiosResponse<T>> {
    return axios.post<T>(this.baseURL + path, body);
  }

  async createUser<T = any>(path: string): Promise<AxiosResponse<T>> {
    return axios.post<T>(this.baseURL + path);
  }

  async getUser<T = any>(path: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(this.baseURL + path);
  }
}

export default new RequestAPI();
