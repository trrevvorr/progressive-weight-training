/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createExercise = /* GraphQL */ `
  mutation CreateExercise(
    $input: CreateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    createExercise(input: $input, condition: $condition) {
      id
      name
      index
      sessionID
      createdAt
      updatedAt
    }
  }
`;
export const updateExercise = /* GraphQL */ `
  mutation UpdateExercise(
    $input: UpdateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    updateExercise(input: $input, condition: $condition) {
      id
      name
      index
      sessionID
      createdAt
      updatedAt
    }
  }
`;
export const deleteExercise = /* GraphQL */ `
  mutation DeleteExercise(
    $input: DeleteExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    deleteExercise(input: $input, condition: $condition) {
      id
      name
      index
      sessionID
      createdAt
      updatedAt
    }
  }
`;
export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
      id
      name
      routineID
      index
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          index
          sessionID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
      id
      name
      routineID
      index
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          index
          sessionID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
      id
      name
      routineID
      index
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          index
          sessionID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createRoutine = /* GraphQL */ `
  mutation CreateRoutine(
    $input: CreateRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    createRoutine(input: $input, condition: $condition) {
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
          index
          createdAt
          updatedAt
          Exercises {
            items {
              id
              name
              index
              sessionID
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const updateRoutine = /* GraphQL */ `
  mutation UpdateRoutine(
    $input: UpdateRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    updateRoutine(input: $input, condition: $condition) {
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
          index
          createdAt
          updatedAt
          Exercises {
            items {
              id
              name
              index
              sessionID
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const deleteRoutine = /* GraphQL */ `
  mutation DeleteRoutine(
    $input: DeleteRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    deleteRoutine(input: $input, condition: $condition) {
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
          index
          createdAt
          updatedAt
          Exercises {
            items {
              id
              name
              index
              sessionID
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      Routines {
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
              index
              createdAt
              updatedAt
              Exercises {
                items {
                  id
                  name
                  index
                  sessionID
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      Routines {
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
              index
              createdAt
              updatedAt
              Exercises {
                items {
                  id
                  name
                  index
                  sessionID
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      Routines {
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
              index
              createdAt
              updatedAt
              Exercises {
                items {
                  id
                  name
                  index
                  sessionID
                  createdAt
                  updatedAt
                }
                nextToken
              }
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
