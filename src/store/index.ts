import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import UserModule from "./modules/UserModule";

config.rawError = true;

const store = createStore({
  modules: {
    UserModule
  }
});

export default store;
