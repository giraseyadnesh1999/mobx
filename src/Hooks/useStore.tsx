import { useContext } from "react";
import { rootStoreContext } from "../mobX/store/index";


export const useStore = () => useContext(rootStoreContext);