import { UpdateUserDto, UserPayload, UsersApi } from "../app/generated/api";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import { BASE_API_URL, StorageConstants } from "../constants/constants";

const usersApi = new UsersApi(undefined, BASE_API_URL, axios);

async function authorizationOptions() {
  return {
    headers: { Authorization: `Bearer ${(await Preferences.get({ key: StorageConstants.token })).value}` },
  };
}

export const UserService = {
  /**
   * Fetches all users from the backend.
   * @returns A promise that resolves to the list of users.
   */
  getAllUsers: async () => {
    return (await usersApi.getUsers(await authorizationOptions())).data;
  },

  getCurrentUser: async (): Promise<UserPayload> => {
    return (await usersApi.getMe(await authorizationOptions())).data;
  },

  /**
   * Updates the current user with the provided data.
   * @param updateUserDto - The data to update the user with.
   * @returns A promise that resolves to the updated user payload.
   */
  updateUser: async (updateUserDto: UpdateUserDto): Promise<UserPayload> => {
    return (await usersApi.editUser(updateUserDto, await authorizationOptions())).data;
  },
};
