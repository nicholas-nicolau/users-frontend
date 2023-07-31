import ApiService from "./ApiService";
import { serialize } from "object-to-formdata";
import { AxiosResponse } from "axios";

class UserService extends ApiService {
  public static get relativeUrl(): string {
    return "users";
  }

  public static save(params: Record<string, unknown>): Promise<AxiosResponse> {
    if (params.id) {
      const id = params.id;

      delete params.id;

      return this.vueInstance.axios.patch(
        `${this.relativeUrl}/${id}`,
        serialize(params)
      );
    } else {
      return this.vueInstance.axios.post(this.relativeUrl, serialize(params));
    }
  }
}

export default UserService;
