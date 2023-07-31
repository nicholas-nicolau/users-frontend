enum Actions {
  // action types
  SAVE_USER = "saveUser",
  LIST_USERS = "listUsers",
  LOAD_USER = "loadUser",
  REMOVE_USER = "removeUser",
  RESTORE_USER = "restoreUser"
}

enum Mutations {
  // mutation types
  SET_ERROR = "setError",
  SET_USERS = "setUsers",
  SET_USER = "setUser",
  SET_META = "setMeta"
}

export { Actions, Mutations };
