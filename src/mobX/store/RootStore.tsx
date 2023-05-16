import { LoginStore } from "./loginStore";
  import { TechSearchstore } from "./techSearchstore";

export interface IRootStore {
  loginStore: LoginStore;
  techSearchstore: TechSearchstore
}

export class RootStore implements IRootStore {
  loginStore: LoginStore;
  techSearchstore: TechSearchstore;
  constructor() {
    this.loginStore = new LoginStore(this);
    this.techSearchstore = new TechSearchstore(this);
  }
}