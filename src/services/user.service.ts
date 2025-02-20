import { UserPayload, UsersApi } from "../app/generated/api";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import { StorageConstants } from "../constants/constants";

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

  getCurrentUser: async (): Promise<UserPayload> => {
    const { value: token } = await Preferences.get({ key: StorageConstants.token });
    const options = { headers: { Authorization: `Bearer ${token}` } };

    return (await usersApi.getMe(options)).data;
  },
};
