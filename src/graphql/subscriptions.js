/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise {
    onCreateExercise {
      id
      name
      sessionID
      userID
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          sessionID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          sessionID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          sessionID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Sessions {
        items {
          id
          name
          routineID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          Exercises {
            nextToken
            startedAt
          }
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Sessions {
        items {
          id
          name
          routineID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          Exercises {
            nextToken
            startedAt
          }
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Sessions {
        items {
          id
          name
          routineID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          Exercises {
            nextToken
            startedAt
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          sessionID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Sessions {
        items {
          id
          name
          routineID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          Exercises {
            nextToken
            startedAt
          }
        }
        nextToken
        startedAt
      }
      Routines {
        items {
          id
          name
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          Sessions {
            nextToken
            startedAt
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          sessionID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Sessions {
        items {
          id
          name
          routineID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          Exercises {
            nextToken
            startedAt
          }
        }
        nextToken
        startedAt
      }
      Routines {
        items {
          id
          name
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          Sessions {
            nextToken
            startedAt
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Exercises {
        items {
          id
          name
          sessionID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Sessions {
        items {
          id
          name
          routineID
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          Exercises {
            nextToken
            startedAt
          }
        }
        nextToken
        startedAt
      }
      Routines {
        items {
          id
          name
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          Sessions {
            nextToken
            startedAt
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
