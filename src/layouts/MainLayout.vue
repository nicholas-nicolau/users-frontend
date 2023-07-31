<template>
  <div class="home">
    <h1>LISTA DE USUÁRIOS</h1>
    <header class="d-flex justify-content-between align-items-center">
      <div class="d-flex justify-content-between">
        <select
          id="itemsPerPage"
          @change="pageSize($event)"
          class="form-select form-select-lg m-3"
        >
          <option
            v-for="size in pageSizes"
            :key="size"
            :value="size"
            :selected="size == 10"
          >
            {{ size }} <small> registros</small>
          </option>
        </select>

        <button
          class="btn btn-secondary m-3"
          title="Adicionar usuário"
          :disabled="requestFromApi.value"
          @click="showModal()"
        >
          <i class="fa-solid fa-plus fa-2xl"></i>
        </button>
      </div>

      <div>
        <button
          title="Página anterior"
          @click="previousPage()"
          :disabled="disablePageButton()"
          type="button"
          class="btn btn-secondary"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        {{ meta?.total_of_pages === 0 ? 0 : Number(meta?.page_number) + 1 }} /
        {{ meta?.total_of_pages }}

        <button
          title="Pŕoxima página"
          @click="nextPage()"
          :disabled="disablePageButton()"
          type="button"
          class="btn btn-secondary"
        >
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="form-group">
        <input
          type="text"
          @keyup="searchTerm($event)"
          class="form-control"
          placeholder="Busque por algum termo"
        />
      </div>
    </header>

    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th
            v-for="(header, index) in tableHeaders"
            :key="index"
            @click="sortTable(header.key)"
            scope="col"
          >
            {{ header.humanize }}
            <div
              v-if="header.key == meta?.sort_by"
              class="d-inline-flex p-2"
              role="link"
            >
              <div v-if="meta?.sort_direction == 'desc'">
                <i class="fa-solid fa-arrow-up" title="DESC"></i>
              </div>
              <div v-else>
                <i class="fa-solid fa-arrow-down" title="ASC"></i>
              </div>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id" scope="row">
          <td v-for="header in tableHeaders" :key="header.key + user.id">
            {{ user[header.key] }}
          </td>
          <td>
            <button
              class="btn btn-primary m-1"
              @click="editUser(user)"
              :disabled="requestFromApi.value"
            >
              Editar
            </button>
            <button
              class="btn btn-danger m-1"
              @click="destroyUser(user.id)"
              :disabled="requestFromApi.value"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <footer>{{ footerMessage }}</footer>
    <span class="d-flex justify-content-center align-items-center">
      <label>Requisitar dados diretamente da API</label>
      <input
        class="checkbox form-check-label m-1"
        type="checkbox"
        v-model="requestFromApi.value"
        @change="fetchUsers(meta || {})"
    /></span>
    <div class="custom_modal" @click="hideModal()" v-if="isModalOpen">
      <div @click.stop="" class="form_body">
        <h2>Dados do usuário</h2>
        <form>
          <div class="form-group mb-4">
            <label class="d-flex" for="userName">Nome do Usuário</label>
            <input
              type="text"
              class="form-control"
              id="userName"
              placeholder="Nome do usuário"
              v-model="editedUser.name"
            />
            <p class="text-danger d-flex" v-if="formErrors.name.length > 0">
              {{ formErrors.name }}
            </p>
          </div>
          <div class="form-group mb-4">
            <label class="d-flex" for="age">Idade</label>
            <input
              type="numeric"
              class="form-control"
              id="age"
              placeholder="Idade do usuário"
              v-model="editedUser.age"
            />
            <p class="text-danger d-flex" v-if="formErrors.age.length > 0">
              {{ formErrors.age }}
            </p>
          </div>
          <div class="form-group mb-4">
            <label class="d-flex" for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email do usuário"
              v-model="editedUser.email"
            />
            <p class="text-danger d-flex" v-if="formErrors.email.length > 0">
              {{ formErrors.email }}
            </p>
          </div>
          <button type="button" class="btn btn-secondary" @click="saveUser()">
            Salvar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { useStore } from "vuex";

import { Actions } from "@/store/enums/StoreEnums";
import { User } from "@/core/data/user";
import { Meta } from "@/core/data/meta";

import Swal from "sweetalert2";

import * as yup from "yup";

export default defineComponent({
  name: "HomeView",
  setup() {
    const store = useStore();
    const users = ref<Array<User>>([]);
    const meta = ref<Meta | null>(null);
    const footerMessage = ref<string>("");
    const isModalOpen = ref<boolean>(false);
    const editedUser = ref<User>({ name: "", age: "", email: "", id: "" });
    const formErrors = ref({ name: "", age: "", email: "" });
    const requestFromApi = reactive({ value: false });

    const pageSizes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    const tableHeaders = [
      { key: "id", humanize: "ID" },
      { key: "name", humanize: "Nome" },
      { key: "age", humanize: "Idade" },
      { key: "email", humanize: "Email" }
    ];

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      age: yup
        .number()
        .typeError("Você deve inserir um número")
        .required("Idade é obrigatório")
        .integer()
        .min(0, "Idade deve ser maior do que zero"),
      email: yup.string().email().required("Email é obrigatório")
    });

    onMounted(async () => {
      await fetchUsers();
      updateFooterMessage();
    });

    const fetchUsers = async (_meta = {}) => {
      await store.dispatch(Actions.LIST_USERS, {
        ..._meta,
        request_from_api: requestFromApi.value
      });

      users.value = store.getters.getUsers as Array<User>;
      meta.value = store.getters.getMeta as Meta;

      updateFooterMessage();
    };

    const mergeInMeta = (object: object = {}) => {
      meta.value = {
        ...meta.value!,
        ...object
      };
    };

    const sortTable = (header: string) => {
      const sort_direction =
        meta.value?.sort_by == header
          ? meta.value?.sort_direction == "asc"
            ? "desc"
            : "asc"
          : "asc";

      mergeInMeta({ sort_direction: sort_direction, sort_by: header });
      fetchUsers(meta.value || {});
    };

    const pageSize = async (event: any) => {
      const page_size = event.target.value as number;

      mergeInMeta({ page_size });
      fetchUsers(meta.value || {});
    };

    const searchTerm = async (event: any) => {
      const term = event.target.value as string;

      mergeInMeta({ term });
      fetchUsers(meta.value || {});
    };

    const nextPage = () => {
      const page_number = Math.min(
        (meta.value?.page_number as number) + 1,
        (meta.value?.total_of_pages as number) - 1
      );

      mergeInMeta({ page_number });
      fetchUsers(meta.value || {});
    };

    const previousPage = () => {
      const page_number = Math.max((meta.value?.page_number as number) - 1, 0);

      mergeInMeta({ page_number });
      fetchUsers(meta.value || {});
    };

    const updateFooterMessage = () => {
      const firstItemIndex =
        (meta.value?.page_number as number) * (meta.value?.page_size as number);

      const lastItemIndex = Math.min(
        firstItemIndex + (meta.value?.page_size as number),
        meta.value?.total_of_registers as number
      );

      footerMessage.value = `Mostrando ${
        meta.value?.total_of_registers == 0 ? 0 : firstItemIndex + 1
      } - ${lastItemIndex} de um total de ${
        meta.value?.total_of_registers
      } registros`;
    };

    const disablePageButton = () => {
      return !(Number(meta.value?.total_of_pages) > 1);
    };

    const destroyUser = async (userId: string | number) => {
      await store.dispatch(Actions.REMOVE_USER, userId);
      fetchUsers(meta.value!);

      Swal.fire({
        text: "Usuário deletado com sucesso!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: "btn fw-bold btn-light-danger"
        }
      });
    };

    const editUser = (user: User) => {
      editedUser.value = { ...user };

      showModal();
    };

    const saveUser = async () => {
      const user: User = editedUser.value;
      if (!Number(user.id)) delete user.id;

      try {
        schema.validateSync(user, { abortEarly: false });
        formErrors.value = { name: "", age: "", email: "" };

        await store.dispatch(Actions.SAVE_USER, user);

        const [error] = Object.keys(store.getters.getErrors);

        if (error) {
          Swal.fire({
            text: store.getters.getErrors[error],
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn fw-bold btn-light-danger"
            }
          });
        } else {
          hideModal();
          fetchUsers(meta.value!);

          Swal.fire({
            text: "Usuário salvo com sucesso!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn fw-bold btn-light-danger"
            }
          });
        }
      } catch (err: any) {
        formErrors.value = { name: "", age: "", email: "" };

        err.inner.forEach((error: any) => {
          formErrors.value[error.path as "age" | "name" | "email"] =
            error.message;
        });
      }
    };

    const showModal = () => {
      isModalOpen.value = true;
    };

    const hideModal = () => {
      editedUser.value = { name: "", age: "", email: "", id: "" };
      formErrors.value = { name: "", age: "", email: "" };

      isModalOpen.value = false;
    };

    return {
      users,
      meta,

      tableHeaders,
      pageSizes,
      sortTable,
      pageSize,
      searchTerm,
      footerMessage,

      nextPage,
      previousPage,
      disablePageButton,

      destroyUser,
      editUser,
      saveUser,
      editedUser,

      isModalOpen,
      formErrors,
      showModal,
      hideModal,

      requestFromApi,
      fetchUsers
    };
  }
});
</script>

<style>
body {
  padding: 20px;
}

thead:hover {
  cursor: pointer;
}

.custom_modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.form_body {
  background-color: white;
  padding: 30px;
  width: 30%;
  max-width: 500px;
  height: auto;
}

.checkbox {
  width: 20px;
  height: 20px;
}
</style>
