import path from "path";
import { api } from "./Api";
import { ApiRoutes } from "../enums";
import { CreateMeetingData, MeetingData, ShortMeetingData } from "../interfaces/dto";

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
    const data = response.data as ShortMeetingData;
    return data;
  }

  public static async Delete(id: string) {
    const url = path.join(ApiRoutes.Meetings, id);
    const response = await api.delete(url);
    return response.data;
  }
}