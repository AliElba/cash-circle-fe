import { UpdateUserDto, UserPayload, UsersApi } from "../app/generated/api";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import { BASE_API_URL, StorageConstants } from "../constants/constants";

const usersApi = new UsersApi(undefined, BASE_API_URL, axios);

export const UserService = {
  /**
   * Fetches all users from the backend.
   * @returns A promise that resolves to the list of users.
   */
  getAllUsers: async () => {
    const options = {
      headers: { Authorization: `Bearer ${(await Preferences.get({ key: StorageConstants.token })).value}` },
    };

    return (await usersApi.getUsers(options)).data;
  },

  getCurrentUser: async (): Promise<UserPayload> => {
    const options = {
      headers: { Authorization: `Bearer ${(await Preferences.get({ key: StorageConstants.token })).value}` },
    };

    return (await usersApi.getMe(options)).data;
  },

  /**
   * Updates the current user with the provided data.
   * @param updateUserDto - The data to update the user with.
   * @returns A promise that resolves to the updated user payload.
   */
  updateUser: async (updateUserDto: UpdateUserDto): Promise<UserPayload> => {
    const options = {
      headers: { Authorization: `Bearer ${(await Preferences.get({ key: StorageConstants.token })).value}` },
    };

    return (await usersApi.editUser(updateUserDto, options)).data;
  },
};
