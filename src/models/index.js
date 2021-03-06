// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Exercise, Session, Routine, User } = initSchema(schema);

export {
  Exercise,
  Session,
  Routine,
  User
};