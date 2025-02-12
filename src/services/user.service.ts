import {UsersApi} from "../app/generated/api";import {UsersApi} from "../app/generated/api";import { UsersApi } from "../app/generated/api";
import axios from "axios";

const usersApi = new UsersApi(undefined, "/api", axios);

export const UserService = {
  /**
   * Fetches all users from the backend.
   * @returns A promise that resolves to the list of users.
   */
  getAllUsers: async () => {
    const response = await usersApi.getUsers();
    return response.data;
  },
};
