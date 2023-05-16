import axios from "axios";
import { getToken } from "../pages/auth/authUser";

const backend = `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/`;
const fetchFunction = async (url: any) => {
  try {
    const { data } = await axios.get(backend + url, {
      headers: {
        token: `${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

// postFunction

const postFunction = async (url: any, dataObj: any) => {
  try {
    const { data } = await axios.post(backend + url, dataObj, {
      headers: {
        token: `${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

// postFunction with form data

const postFunctionFormData = async (url: any, dataObj: any) => {
  try {
    const { data } = await axios.post(backend + url, dataObj, {
      headers: {
        token: `${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

// patchFunction

const patchFunction = async (url: any, dataObj: any) => {
  try {
    const { data } = await axios.patch(backend + url, dataObj, {
      headers: {
        token: `${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

// deleteFunction

const deleteFunction = async (url: any) => {
  try {
    const { data } = await axios.delete(backend + url, {
      headers: {
        token: `${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

export {
  fetchFunction,
  postFunction,
  patchFunction,
  deleteFunction,
  postFunctionFormData,
};
