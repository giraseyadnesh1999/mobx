import axios from "axios";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import { IRootStore } from "./RootStore";
import { postFunction } from "../../components/common/AxiosInstance";
import SecureLS from "secure-ls";
import { Permissions } from "../../constants/PermissionConstant";

export interface Geolocation {
  lat: string;
  long: string;
}

export interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface Name {
  firstname: string;
  lastname: string;
}

export interface IUserDetails {
  count: number;
  message: string;
  payload: {};
  status: boolean;
  __v: number;
}

export interface Usertoken {
  token: string;
}

export class LoginStore {
  rootStore: IRootStore;
  userDetails: IUserDetails | null = null;
  userreffreshToken: Usertoken | null = null;
  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      userDetails: observable,
      fetchUserToken: action,
      getUserDetails: computed,
      userreffreshToken: observable,
      fetchreffreshToken: action,
      getreffreshtoken: computed,
    });
    this.rootStore = rootStore;
  }

  logout() {
    this.userDetails = null;
  }

  async fetchUserToken(userName: string, password: string) {
    const data = {
      username: userName,
      password: password,
    };

    const tokenRes = await postFunction(`api/login`, data);
    console.log(tokenRes, "OOOO");
    // this.userDetails = tokenRes
    this.userDetails = tokenRes;
    const ls = new SecureLS();
    if (tokenRes?.status) {
      ls?.set("token", { data: tokenRes?.payload?.token });
      ls?.set("refreshtoken", { data: tokenRes?.payload?.refreshtoken });

      // set user permissions
      let userPermission: any = [];
      tokenRes?.payload?.permissions.map((per: any) => {
        userPermission.push(parseInt(per?.id));
      });
      ls?.set("userPermissions", { data: userPermission });

      if (tokenRes?.payload?.role === Permissions.Admin) {
        ls?.set("role", { data: tokenRes?.payload?.role });
      }
      ls?.set("isNewUser", { data: tokenRes?.payload?.isNewUser });
    }
  }

  async fetchreffreshToken(token: string) {
    const reffreshTokenRes = await postFunction(`api/refreshtoken`, token);
    console.log(reffreshTokenRes, "reffres");
    this.userreffreshToken = reffreshTokenRes;
  }
  get getUserDetails() {
    return this.userDetails;
  }

  get getreffreshtoken() {
    return this.userreffreshToken;
  }
}
