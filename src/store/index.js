import Vue from "vue";
import Vuex from "vuex";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import {
  createRoutine,
  createUser,
  deleteRoutine,
  deleteUser,
  updateUser,
} from "../graphql/mutations";

Vue.use(Vuex);

const USER_ID_STORAGE_KEY = "LOGGED_IN_USER_ID";

export default new Vuex.Store({
  state: {
    userId: null,
    user: null,
  },
  mutations: {
    setUserId(state, id) {
      localStorage.setItem(USER_ID_STORAGE_KEY, id);
      state.userId = id;
    },
    loadUserId(state) {
      state.userId = localStorage.getItem(USER_ID_STORAGE_KEY);
    },
    setUser(state, model) {
      localStorage.setItem(USER_ID_STORAGE_KEY, model.id);
      state.userId = model.id;
      state.user = model;
    },
    resetState(state) {
      localStorage.removeItem(USER_ID_STORAGE_KEY);
      state.userId = null;
      state.user = null;
    },
  },
  getters: {
    userId: state => {
      return state.userId;
    },
    userName: state => {
      return state.user && state.user.name;
    },
    routines: state => {
      return state.user && state.user.Routines && state.user.Routines.items;
    },
  },
  actions: {
    logout({ commit }) {
      commit("resetState");
      return Promise.resolve();
    },
    // #region user
    reloadUser({ dispatch, getters }) {
      return dispatch("loadUser", getters.userId);
    },
    loadUser({ commit }, id) {
      if (id) {
        return API.graphql(graphqlOperation(getUser, { id: id })).then(
          response => {
            if (response.data.getUser) {
              commit("setUser", response.data.getUser);
              return Promise.resolve(response.data.getUser);
            } else {
              return Promise.reject({
                status: 404,
                message: "user not found for id " + id,
              });
            }
          },
        );
      } else {
        return Promise.reject({
          status: 400,
          message: `loadUser failed due to invalid input: id=${id}`,
        });
      }
    },
    updateUserName({ commit, getters }, name) {
      const id = getters.userId;

      if (name && id) {
        const input = {
          id: id,
          name: name,
        };
        return API.graphql(graphqlOperation(updateUser, { input })).then(
          response => {
            commit("setUser", response.data.updateUser);
            return response.data.updateUser;
          },
        );
      } else {
        return Promise.reject({
          status: 400,
          message: `updateUserName failed due to invalid input: name=${name}, id=${id}`,
        });
      }
    },
    createUser({ commit }, name) {
      if (name) {
        const input = {
          name: name,
        };
        return API.graphql(graphqlOperation(createUser, { input })).then(
          response => {
            commit("setUser", response.data.createUser);
            return response.data.createUser;
          },
        );
      } else {
        return Promise.reject({
          status: 400,
          message: `createUser failed due to invalid input: name=${name}`,
        });
      }
    },
    deleteUser({ dispatch, getters }) {
      const id = getters.userId;
      const routines = getters.routines;

      if (id) {
        const promises = routines
          ? routines.map(
              routine => dispatch("deleteRoutine", { id: routine.id }),
              1,
            )
          : [];

        return Promise.all(promises).then(() =>
          API.graphql(graphqlOperation(deleteUser, { input: { id } })),
        );
      } else {
        return Promise.reject({
          status: 400,
          message: `deleteUser failed due to invalid input: id=${id}`,
        });
      }
    },
    // #endregion
    //#region routine
    createRoutine({ dispatch, getters }, data) {
      const userId = getters.userId;

      if (data && data.name && userId) {
        const input = {
          name: data.name,
          userID: userId,
        };
        const promise = API.graphql(
          graphqlOperation(createRoutine, { input }),
        ).then(response => response.data.createRoutine);

        if (data.reloadUser) {
          promise.then(() => dispatch("reloadUser"));
        }
        return promise;
      } else {
        return Promise.reject({
          status: 400,
          message: `createRoutine failed due to invalid input: data=${JSON.stringify(
            data,
          )}, userId=${userId}`,
        });
      }
    },
    deleteRoutine({ dispatch }, data) {
      if (data && data.id) {
        const input = { id: data.id };
        const promise = API.graphql(graphqlOperation(deleteRoutine, { input }));

        // TODO: delete sessions

        if (data.reloadUser) {
          promise.then(() => dispatch("reloadUser"));
        }
        return promise;
      } else {
        return Promise.reject({
          status: 400,
          message: `deleteRoutine failed due to invalid input: data=${JSON.stringify(
            data,
          )}`,
        });
      }
    },
    //#endregion
  },
  modules: {},
});
