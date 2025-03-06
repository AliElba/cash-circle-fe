import axios, { AxiosError } from "axios";
import { CirclesApi, CircleStatus, CreateCircleDto, MemberDto, UpdateCircleDto } from "../app/generated/api";
import { Preferences } from "@capacitor/preferences";
import { BASE_API_URL, StorageConstants } from "../constants/constants";

const circleApi = new CirclesApi(undefined, BASE_API_URL, axios);

async function authorizationOptions() {
  return {
    headers: { Authorization: `Bearer ${(await Preferences.get({ key: StorageConstants.token })).value}` },
  };
}

export const CircleService = {
  getUserCircles: async (userId: string, circleStatus: CircleStatus = CircleStatus.Active) => {
    try {
      const response = await circleApi.findAllUserCircles(circleStatus, await authorizationOptions());
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user circles:", error);
      throw error;
    }
  },

  getCircleById: async (id: string) => {
    try {
      const response = await circleApi.findOne(id, await authorizationOptions());
      return response.data;
    } catch (error) {
      console.error("Failed to fetch circle details:", error);
      throw error;
    }
  },

  createCircle: async (createCircleDto: CreateCircleDto) => {
    try {
      const response = await circleApi.create(createCircleDto, await authorizationOptions());
      return response.data;
    } catch (error: AxiosError | any) {
      console.error("Failed to create circle:", error.response.data.message);
      throw error.response.data.message;
    }
  },

  updateCircle: async (id: string, updateCircleDto: UpdateCircleDto) => {
    try {
      const response = await circleApi.update(id, updateCircleDto, await authorizationOptions());
      return response.data;
    } catch (error) {
      console.error("Failed to update circle:", error);
      throw error;
    }
  },

  deleteCircle: async (id: string) => {
    try {
      await circleApi.remove(id, await authorizationOptions());
    } catch (error) {
      console.error("Failed to delete circle:", error);
      throw error;
    }
  },

  updateCircleMember: async (id: string, memberDto: Partial<MemberDto>) => {
    try {
      const response = await circleApi.updateMember(id, memberDto as MemberDto, await authorizationOptions());
      return response.data;
    } catch (error) {
      console.error("Failed to update circle member:", error);
      throw error;
    }
  },
};
