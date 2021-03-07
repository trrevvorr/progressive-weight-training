/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
      id
      name
      sessionID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        sessionID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      name
      routineID
      userID
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          sessionID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        routineID
        userID
        createdAt
        updatedAt
        Exercises {
          items {
            id
            name
            sessionID
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getRoutine = /* GraphQL */ `
  query GetRoutine($id: ID!) {
    getRoutine(id: $id) {
      id
      name
      userID
      createdAt
      updatedAt
      Sessions {
        items {
          id
          name
          routineID
          userID
          createdAt
          updatedAt
          Exercises {
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const listRoutines = /* GraphQL */ `
  query ListRoutines(
    $filter: ModelRoutineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoutines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        userID
        createdAt
        updatedAt
        Sessions {
          items {
            id
            name
            routineID
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          sessionID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      Sessions {
        items {
          id
          name
          routineID
          userID
          createdAt
          updatedAt
          Exercises {
            nextToken
          }
        }
        nextToken
      }
      Routines {
        items {
          id
          name
          userID
          createdAt
          updatedAt
          Sessions {
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        Exercises {
          items {
            id
            name
            sessionID
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        Sessions {
          items {
            id
            name
            routineID
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        Routines {
          items {
            id
            name
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
