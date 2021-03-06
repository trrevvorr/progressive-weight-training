import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Exercise {
  readonly id: string;
  readonly name?: string;
  readonly sessionID?: string;
  readonly userID?: string;
  constructor(init: ModelInit<Exercise>);
  static copyOf(source: Exercise, mutator: (draft: MutableModel<Exercise>) => MutableModel<Exercise> | void): Exercise;
}

export declare class Session {
  readonly id: string;
  readonly name?: string;
  readonly routineID?: string;
  readonly Exercises?: (Exercise | null)[];
  readonly userID?: string;
  constructor(init: ModelInit<Session>);
  static copyOf(source: Session, mutator: (draft: MutableModel<Session>) => MutableModel<Session> | void): Session;
}

export declare class Routine {
  readonly id: string;
  readonly name?: string;
  readonly userID?: string;
  readonly Sessions?: (Session | null)[];
  constructor(init: ModelInit<Routine>);
  static copyOf(source: Routine, mutator: (draft: MutableModel<Routine>) => MutableModel<Routine> | void): Routine;
}

export declare class User {
  readonly id: string;
  readonly name?: string;
  readonly Routines?: (Routine | null)[];
  readonly Sessions?: (Session | null)[];
  readonly Exercises?: (Exercise | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}