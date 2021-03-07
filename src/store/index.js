import Vue from "vue";
import Vuex from "vuex";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { createRoutine, createUser, updateUser } from "../graphql/mutations";

Vue.use(Vuex);

const USER_ID_STORAGE_KEY = "LOGGED_IN_USER_ID";

export default new Vuex.Store({
  state: {
    userId: null,
    user: null,
    routines: [],
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
    addRoutine(state, model) {
      state.routines.push(model);
    },
    resetState(state) {
      localStorage.removeItem(USER_ID_STORAGE_KEY);
      state.userId = null;
      state.user = null;
      state.routines = null;
    },
  },
  getters: {
    userId: state => {
      return state.userId;
    },
    userName: state => {
      return state.user && state.user.name;
    },
  },
  actions: {
    async logout({ commit }) {
      commit("resetState");
    },
    async loadUser({ commit }, id) {
      if (id) {
        return API.graphql(graphqlOperation(getUser, { id: id })).then(
          response => {
            commit("setUser", response.data.getUser);
            return response.data.getUser;
          },
        );
      } else {
        return Promise.reject(`loadUser failed due to invalid input: id=${id}`);
      }
    },
    async updateUserName({ state, commit }, name) {
      if (name && state.user) {
        const input = {
          id: state.user.id,
          _version: state.user._version,
          name: name,
        };
        return API.graphql(graphqlOperation(updateUser, { input })).then(
          response => {
            commit("setUser", response.data.updateUser);
            return response.data.updateUser;
          },
        );
      } else {
        return Promise.reject(
          `updateUserName failed due to invalid input: name=${name}, state.user=${state.user}`,
        );
      }
    },
    async createUser({ commit }, name) {
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
        return Promise.reject(
          `createUser failed due to invalid input: name=${name}`,
        );
      }
    },
    async createRoutine({ commit }, data) {
      if (data && data.name && data.userId) {
        const input = {
          name: data.name,
          userID: data.userId,
        };
        return API.graphql(graphqlOperation(createRoutine, { input })).then(
          response => {
            commit("addRoutine", response.data.createRoutine);
            return response.data.createRoutine;
          },
        );
      } else {
        return Promise.reject(
          `createRoutine failed due to invalid input: name=${data &&
            data.name}, userId=${data && data.userId}`,
        );
      }
    },
  },
  modules: {},
});
