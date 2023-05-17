import path from "path";
import { api } from "./Api";
import { ApiRoutes } from "../enums";
import { ChannelData, CreateChannelData, ShortChannelData } from "../interfaces/dto";

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
    const shortChannels = response.data as ShortChannelData;
    return shortChannels;
  }

  public static async Delete(id: string) {
    const url = path.join(ApiRoutes.Channels, id);
    const response = await api.delete(url);
    return response.data;
  }

  public static async UploadAvatar(formData: FormData) {
    const url = path.join(ApiRoutes.Channels, 'upload-avatar');
    const response = await api.post(url, formData);
    return response.data;
  }
}