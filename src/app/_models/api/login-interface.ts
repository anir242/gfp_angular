import {UsersInterface} from './users/users-interface';

export interface LoginInterface extends UsersInterface {
  token: string;
}
