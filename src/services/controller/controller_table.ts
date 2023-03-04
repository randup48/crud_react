import User from "../../models/user";
import { API_ENDPOINT_USER } from "../api/request";

export default class TableController {
  public async getAllUser() {
    const response = await API_ENDPOINT_USER.GET_USER;

    try {
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async postUser(user: User) {
    const response = await API_ENDPOINT_USER.POST_USER(user);

    try {
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  public async putUser(user: User) {
    const response = await API_ENDPOINT_USER.PUT_USER(user);

    try {
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  public async deleteUser(user_id: string) {
    const response = await API_ENDPOINT_USER.DELETE_USER(user_id);

    try {
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
