import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "@fortawesome/fontawesome-free/js/all.js";

import "../src/styles/custom.css";

import ApiService from "@/core/services/ApiService";

const app = createApp(App);

app.use(store);
app.use(router);

ApiService.init(app);

app.mount("#app");
