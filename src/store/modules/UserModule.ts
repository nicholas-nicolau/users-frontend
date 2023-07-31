import { User } from "@/core/data/user";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import UserService from "@/core/services/UserService";

@Module
export default class UserModule extends VuexModule {
  list: Array<User> = [];
  meta: Array<object | null> = [];
  model: User | null = null;
  errors = {};

  get getMeta(): Array<object | null> {
    return this.meta;
  }

  get getUsers(): Array<User> {
    return this.list;
  }

  get getErrors() {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error: object) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_USERS](data: Array<User>) {
    this.list = data;
  }

  @Mutation
  [Mutations.SET_USER](data: User) {
    this.model = data;
  }

  @Mutation
  [Mutations.SET_META](data: Array<object>) {
    this.meta = data;
  }

  @Action
  [Actions.SAVE_USER](data: Record<string, unknown>) {
    this.context.commit(Mutations.SET_ERROR, []);

    return UserService.save(data).catch(({ response }) => {
      this.context.commit(
        Mutations.SET_ERROR,
        response.data.errors || response.data.error || []
      );
    });
  }

  @Action
  [Actions.LIST_USERS](data: Record<string, unknown>) {
    this.context.commit(Mutations.SET_ERROR, []);

    return UserService.list(data)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_USERS, data["users"]);
        this.context.commit(Mutations.SET_META, data["meta"]);
      })
      .catch(({ response }) => {
        this.context.commit(
          Mutations.SET_ERROR,
          response.data.errors || response.data.error
        );
      });
  }

  @Action
  [Actions.LOAD_USER](id: string | number) {
    this.context.commit(Mutations.SET_ERROR, []);

    return UserService.load(id)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_USER, data);
      })
      .catch(({ response }) => {
        this.context.commit(
          Mutations.SET_ERROR,
          response.data.errors || response.data.error
        );
      });
  }

  @Action
  [Actions.REMOVE_USER](id: string | number) {
    this.context.commit(Mutations.SET_ERROR, []);

    return UserService.delete(id)
      .then(() => {
        this.context.commit(Mutations.SET_USER, {
          id: null,
          name: "",
          email: "",
          age: ""
        });
      })
      .catch(({ response }) => {
        this.context.commit(
          Mutations.SET_ERROR,
          response.data.errors || response.data.error
        );
      });
  }
}
