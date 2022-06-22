import { EventEmitter } from "@angular/core";
import { User } from "../interfaces/user";

export class Auth {
  private static _user: User;
  static userEmitter = new EventEmitter<User>();

  // setter for user data
  static set user(user: User) {
    this._user = user;
    this.userEmitter.emit(user);
  }

  // gets user
  static get user(): User {
    return this._user;
  }

  static canAccess(permissions: any) {
    if (!this._user) {
      return false;
    }

    return this._user.permissions.filter(p => permissions.indexOf(p) !== -1).length > 0;
  }
}
