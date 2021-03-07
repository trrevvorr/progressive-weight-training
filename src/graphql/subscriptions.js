/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise {
    onCreateExercise {
      id
      name
      sessionID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise {
    onUpdateExercise {
      id
      name
      sessionID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise {
    onDeleteExercise {
      id
      name
      sessionID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession {
    onCreateSession {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession {
    onUpdateSession {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession {
    onDeleteSession {
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
export const onCreateRoutine = /* GraphQL */ `
  subscription OnCreateRoutine {
    onCreateRoutine {
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
export const onUpdateRoutine = /* GraphQL */ `
  subscription OnUpdateRoutine {
    onUpdateRoutine {
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
export const onDeleteRoutine = /* GraphQL */ `
  subscription OnDeleteRoutine {
    onDeleteRoutine {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
