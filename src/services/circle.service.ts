import axios from "axios";
import { CirclePayload, CirclesApi, CircleStatus, CreateCircleDto, UpdateCircleDto } from "../app/generated/api";

const circleApi = new CirclesApi(undefined, "/api", axios);

export const CircleService = {
  // Fetch all active circles where the user is a member
  getUserCircles: async (userId: string, circleStatus: CircleStatus = CircleStatus.Active) => {
    try {
      const response = await circleApi.findAll(); // Fetch all circles

      const userCircles = response.data.filter((circle: CirclePayload) =>
        circle.members.some((member) => member.userId === userId),
      );

      // Filter circles by status if provided
      if (circleStatus) {
        return userCircles.filter((circle: CirclePayload) => circle.status === circleStatus);
      }

      // Return all user circles if no status is provided
      return userCircles;
    } catch (error) {
      console.error("Failed to fetch user circles:", error);
      throw error;
    }
  },

  getCircleById: async (id: string) => {
    try {
      const response = await circleApi.findOne(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch circle details:", error);
      throw error;
    }
  },

  createCircle: async (createCircleDto: CreateCircleDto) => {
    try {
      const response = await circleApi.create(createCircleDto);
      return response.data;
    } catch (error) {
      console.error("Failed to create circle:", error);
      throw error;
    }
  },

  updateCircle: async (id: string, updateCircleDto: UpdateCircleDto) => {
    try {
      const response = await circleApi.update(id, updateCircleDto);
      return response.data;
    } catch (error) {
      console.error("Failed to update circle:", error);
      throw error;
    }
  },
};
