import path from "path";
import ApiRoutes from "../enums/ApiRoutes";
import { ChannelData, CreateChannelData } from "../interfaces/dto/channels";
import { api } from "./Api";

export default class Channels {
  public static async Get(id: string) {
    const url = path.join(ApiRoutes.Channels, id);
    const response = await api.get(url);
    const data = response.data as ChannelData;
    return data;
  }

  public static async Create(createData: CreateChannelData) {
    const url = path.join(ApiRoutes.Channels);
    const response = await api.post(url, createData);
    return response.data;
  }

  public static async Delete(id: string) {
    const url = path.join(ApiRoutes.Channels, id);
    const response = await api.delete(url);
    return response.data;
  }
}