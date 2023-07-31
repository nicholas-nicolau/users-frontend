import { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  public static get relativeUrl(): string {
    return "";
  }

  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);

    ApiService.vueInstance.axios.defaults.baseURL = process.env.VUE_APP_API_URL;

    ApiService.vueInstance.axios.interceptors.request.use(function (config) {
      ApiService.setHeader();

      return config;
    });

    ApiService.vueInstance.axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.isAxiosError) {
          switch (error.response.status) {
            case 500: {
              return Promise.reject({
                response: {
                  data: {
                    errors: ["Erro interno do sistema. Contate o suporte"]
                  }
                }
              });
            }
            default: {
              return Promise.reject(error);
            }
          }
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      "Access-Control-Allow-Origin"
    ] = "*";
    ApiService.vueInstance.axios.defaults.headers.common[
      "Access-Control-Allow-Methods"
    ] = "*";
    ApiService.vueInstance.axios.defaults.headers.common[
      "Access-Control-Allow-Headers"
    ] = "Content-Type";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param id: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(id: string | number): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(`${this.relativeUrl}/${id}`);
  }

  /**
   * @description send the GET HTTP request
   * @param query: string
   * @returns Promise<AxiosResponse>
   */
  public static list(params: Record<string, unknown>): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(this.relativeUrl, {
      params
    });
  }

  /**
   * @description Checks the object and issues a POST or a PATCH request
   * @param params: Object
   * @returns Promise<AxiosResponse>
   */
  public static save(params: Record<string, unknown>): Promise<AxiosResponse> {
    if (params.id) {
      const id = params.id;

      delete params.id;

      return ApiService.vueInstance.axios.patch(
        `${this.relativeUrl}/${id}`,
        params
      );
    } else {
      return ApiService.vueInstance.axios.post(this.relativeUrl, params);
    }
  }

  /**
   * @description loads the record
   * @param id: string
   * @returns Promise<AxiosResponse>
   */
  public static load(id: any): Promise<AxiosResponse> {
    return ApiService.get(this.relativeUrl, id);
  }
}

export default ApiService;
