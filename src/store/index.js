import Vue from "vue";
import Vuex from "vuex";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../models";

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
    userId: (state) => {
      return state.userId;
    },
    userName: (state) => {
      return state.user && state.user.name;
    },
  },
  actions: {
    async logout({ commit }) {
      commit("resetState");
    },
    async loadUser({ commit }, id) {
      if (id) {
        return await DataStore.query(User, id).then((model) => {
          commit("setUser", model);
          return model;
        });
      } else {
        return Promise.reject(`loadUser failed due to invalid input: id=${id}`);
      }
    },
    async updateUserName({ state, commit }, name) {
      if (name && state.user) {
        return await DataStore.save(
          User.copyOf(state.user, (newUser) => {
            newUser.name = name;
          })
        ).then((model) => {
          commit("setUser", model);
        });
      } else {
        return Promise.reject(
          `updateUserName failed due to invalid input: name=${name}, state.user=${state.user}`
        );
      }
    },
    async createUser({ commit }, name) {
      if (name) {
        return DataStore.save(
          new User({
            name: name,
            Routines: [],
            Sessions: [],
            Exercises: [],
          })
        ).then((model) => {
          if (model.id) {
            commit("setUser", model);
          } else {
            throw new Error("model created does not have ID: " + model);
          }
        });
      } else {
        return Promise.reject(`createUser failed due to invalid input: name=${name}`);
      }
    },
  },
  modules: {},
});
