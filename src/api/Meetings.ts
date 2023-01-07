import path from "path";
import ApiRoutes from "../enums/ApiRoutes";
import { CreateMeetingData, MeetingData } from "../interfaces/dto/meetings";
import { api } from "./Api";

export default class Meetings {
  public static async Get(id: string) {
    const url = path.join(ApiRoutes.Meetings, id);
    const response = await api.get(url);
    const data = response.data as MeetingData;
    return data;
  }

  public static async Create(createData: CreateMeetingData) {
    const url = path.join(ApiRoutes.Meetings);
    const response = await api.post(url, createData);
    return response.data;
  }

  public static async Delete(id: string) {
    const url = path.join(ApiRoutes.Meetings, id);
    const response = await api.delete(url);
    return response.data;
  }
}