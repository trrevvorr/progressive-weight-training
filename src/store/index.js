import Vue from "vue";
import Vuex from "vuex";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import {
  createRoutine,
  createSession,
  createUser,
  deleteRoutine,
  deleteSession,
  deleteUser,
  updateRoutine,
  updateSession,
  updateUser,
} from "../graphql/mutations";

Vue.use(Vuex);

const USER_ID_STORAGE_KEY = "LOGGED_IN_USER_ID";

export default new Vuex.Store({
  state: {
    userId: null,
    user: null,
    routineId: null,
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
    setRoutineId(state, id) {
      state.routineId = id;
    },
    updateRoutineOnUser(state, updatedRoutine) {
      state.user.Routines.items = state.user.Routines.items.map(routine =>
        routine.id === updatedRoutine.id ? updatedRoutine : routine,
      );
    },
    deleteRoutineOnUser(state, deletedRoutine) {
      state.user.Routines.items = state.user.Routines.items.filter(
        routine => routine.id !== deletedRoutine.id,
      );
    },
    createRoutineOnUser(state, newRoutine) {
      state.user.Routines.items = [...state.user.Routines.items, newRoutine];
    },
    updateSessionOnRoutine(state, updatedSession) {
      state.user.Routines.items = state.user.Routines.items.map(routine =>
        routine.id === state.routineId
          ? {
              ...routine,
              Sessions: {
                ...routine.Sessions,
                items: routine.Sessions.items.map(session =>
                  session.id === updatedSession.id ? updatedSession : session,
                ),
              },
            }
          : routine,
      );
    },
    deleteSessionOnRoutine(state, deletedSession) {
      state.user.Routines.items = state.user.Routines.items.map(routine =>
        routine.id === state.routineId
          ? {
              ...routine,
              Sessions: {
                ...routine.Sessions,
                items: routine.Sessions.items.filter(
                  session => session.id !== deletedSession.id,
                ),
              },
            }
          : routine,
      );
    },
    createSessionOnRoutine(state, newSession) {
      state.user.Routines.items = state.user.Routines.items.map(routine =>
        routine.id === state.routineId
          ? {
              ...routine,
              Sessions: {
                ...routine.Sessions,
                items: [...routine.Sessions.items, newSession],
              },
            }
          : routine,
      );
    },
    resetState(state) {
      state.routine = null;
      state.user = null;
      state.userId = null;
      localStorage.removeItem(USER_ID_STORAGE_KEY);
    },
  },
  getters: {
    userId: state => {
      return state.userId;
    },
    userName: state => {
      return state.user && state.user.name;
    },
    user: state => {
      return state.user;
    },
    routines: state => {
      return state.user && state.user.Routines && state.user.Routines.items;
    },
    routineId: state => {
      return state.routineId;
    },
    sessions: state => {
      const routine =
        state.user &&
        state.routineId &&
        state.user.Routines &&
        state.user.Routines.items &&
        state.user.Routines.items.find(
          routine => routine.id === state.routineId,
        );

      return routine && routine.Sessions.items;
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
      const user = getters.user;

      if (id && user) {
        const promises = user.Routines.items.map(routine =>
          dispatch("deleteRoutine", routine.id),
        );

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
    createRoutine({ commit, getters }, routine) {
      const userId = getters.userId;

      if (routine && routine.name && userId) {
        const input = {
          name: routine.name,
          userID: userId,
        };
        return API.graphql(graphqlOperation(createRoutine, { input })).then(
          response => {
            if (response.data.createRoutine) {
              commit("createRoutineOnUser", response.data.createRoutine);
            }
            return response.data.createRoutine;
          },
        );
      } else {
        return Promise.reject({
          status: 400,
          message: `createRoutine failed due to invalid input: routine=${JSON.stringify(
            routine,
          )}, userId=${userId}`,
        });
      }
    },
    updateRoutineName({ commit }, routine) {
      if (routine && routine.name && routine.id) {
        const input = {
          id: routine.id,
          name: routine.name,
        };
        return API.graphql(graphqlOperation(updateRoutine, { input })).then(
          response => {
            if (response.data.updateRoutine) {
              commit("updateRoutineOnUser", response.data.updateRoutine);
            }
            return response.data.updateRoutine;
          },
        );
      } else {
        return Promise.reject({
          status: 400,
          message: `updateRoutineName failed due to invalid input: routine=${JSON.stringify(
            routine,
          )}`,
        });
      }
    },
    deleteRoutine({ dispatch, commit, getters }, id) {
      const routine =
        getters.routines && getters.routines.find(routine => routine.id === id);

      if (routine) {
        const promises = routine.Sessions.items.map(session =>
          dispatch("deleteSession", session.id),
        );

        const input = { id };
        return Promise.all(promises)
          .then(() => API.graphql(graphqlOperation(deleteRoutine, { input })))
          .then(response => {
            if (response.data.deleteRoutine) {
              commit("deleteRoutineOnUser", response.data.deleteRoutine);
            }
            return response.data.deleteRoutine;
          });
      } else {
        return Promise.reject({
          status: 400,
          message: `deleteRoutine failed due to invalid input: id=${JSON.stringify(
            id,
          )}`,
        });
      }
    },
    //#endregion
    //#region session
    createSession({ commit, getters }, session) {
      const routineId = getters.routineId;

      if (routineId && session && session.name) {
        const input = {
          name: session.name,
          routineID: routineId,
        };
        return API.graphql(graphqlOperation(createSession, { input })).then(
          response => {
            if (response.data.createSession) {
              commit("createSessionOnRoutine", response.data.createSession);
            }
            return response.data.createSession;
          },
        );
      } else {
        return Promise.reject({
          status: 400,
          message: `createSession failed due to invalid input: session=${JSON.stringify(
            session,
          )}, routineId=${routineId}`,
        });
      }
    },
    updateSessionName({ commit, getters }, session) {
      const routineId = getters.routineId;

      if (routineId && session && session.name && session.id) {
        const input = {
          id: session.id,
          name: session.name,
        };
        return API.graphql(graphqlOperation(updateSession, { input })).then(
          response => {
            if (response.data.updateSession) {
              commit("updateSessionOnRoutine", response.data.updateSession);
            }
            return response.data.updateSession;
          },
        );
      } else {
        return Promise.reject({
          status: 400,
          message: `updateSessionName failed due to invalid input: session=${JSON.stringify(
            session,
          )}, routineId=${routineId}`,
        });
      }
    },
    deleteSession({ commit }, id) {
      if (id) {
        const input = { id };
        return API.graphql(graphqlOperation(deleteSession, { input })).then(
          response => {
            if (response.data.deleteSession) {
              commit("deleteSessionOnRoutine", response.data.deleteSession);
            }
            return response.data.deleteSession;
          },
        );
      } else {
        return Promise.reject({
          status: 400,
          message: `deleteSession failed due to invalid input: id=${JSON.stringify(
            id,
          )}`,
        });
      }
    },
    //#endregion
  },
  modules: {},
});
