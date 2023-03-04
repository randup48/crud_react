import axios from "axios";
import User from "../../models/user";
import { AUTH_TOKEN, ConfigAPI } from "./config";

const getAllUser = (url: string) =>
  axios
    .get(url, {
      params: {
        page: 1,
        per_page: 20,
      },
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    })
    .then((response) => {
      // console.log(response);

      return response.data;
    })
    .catch((error) => {
      return error["response"] !== undefined
        ? {
            message: error["response"]["data"]["message"],
            errorCode: error["response"]["data"]["statusCode"],
            isSuccess: false,
            data: [],
          }
        : {
            message: error["message"],
            errorCode: null,
            isSuccess: false,
            data: [],
          };
    });

const postUser = (url: string, user: User) =>
  axios
    .post(
      url,
      {
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
      },
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    )
    .then((response) => {
      // console.log(response);

      return response.data;
    })
    .catch((error) => {
      return error["response"] !== undefined
        ? {
            message: error["response"]["data"]["message"],
            errorCode: error["response"]["data"]["statusCode"],
            isSuccess: false,
            data: [],
          }
        : {
            message: error["message"],
            errorCode: null,
            isSuccess: false,
            data: [],
          };
    });

const putUser = (url: string, user: User) =>
  axios
    .put(
      url,
      {
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
      },
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    )
    .then((response) => {
      // console.log(response);

      return {
        isSuccess: true,
        message: response.statusText,
        data: response.data,
      };
    })
    .catch((error) => {
      return error["response"] !== undefined
        ? {
            message: error["response"]["data"]["message"],
            errorCode: error["response"]["data"]["statusCode"],
            isSuccess: false,
            data: [],
          }
        : {
            message: error["message"],
            errorCode: null,
            isSuccess: false,
            data: [],
          };
    });

const deleteUser = (url: string) =>
  axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    })
    .then((response) => {
      // console.log(response);

      return {
        isSuccess: true,
        message: response.statusText,
        data: response.data,
      };
    })
    .catch((error) => {
      return error["response"] !== undefined
        ? {
            message: error["response"]["data"]["message"],
            errorCode: error["response"]["data"]["statusCode"],
            isSuccess: false,
            data: [],
          }
        : {
            message: error["message"],
            errorCode: null,
            isSuccess: false,
            data: [],
          };
    });

export const API_ENDPOINT_USER = {
  GET_USER: getAllUser(ConfigAPI.USER_URL),
  POST_USER: (user: User) => postUser(ConfigAPI.USER_URL, user),
  PUT_USER: (user: User) =>
    putUser(ConfigAPI.USER_ACTION_URL(user.id ?? ""), user),
  DELETE_USER: (user_id: string) =>
    deleteUser(ConfigAPI.USER_ACTION_URL(user_id ?? "")),
};
