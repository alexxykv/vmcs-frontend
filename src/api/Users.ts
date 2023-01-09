import path from "path";
import ApiRoutes from "../enums/ApiRoutes";
import { ChannelInvitationData } from "../interfaces/dto/channelInvitations";
import { ShortChannelData } from "../interfaces/dto/channels";
import { ChangeUserData, UserData } from "../interfaces/dto/users";
import { api } from "./Api";


export default class Users {
  public static async Get() {
    const url = path.join(ApiRoutes.Users);
    const response = await api.get(url);
    const data = response.data as UserData;
    return data;
  }

  public static async GetAll() {
    const url = path.join(ApiRoutes.Users, 'all');
    const response = await api.get(url);
    const data = response.data as Array<UserData>;
    return data;
  }

  public static async GetAllUserChannels() {
    const url = path.join(ApiRoutes.Users, 'channels');
    const response = await api.get(url);
    const data = response.data as Array<ShortChannelData>;
    return data;
  }

  public static async GetAllUserChannelInvitations() {
    const url = path.join(ApiRoutes.Users, 'invitations', 'channel');
    const response = await api.get(url);
    const data = response.data as Array<ChannelInvitationData>;
    return data;
  }

  public static async Update(id: string, changeData: ChangeUserData) {
    const url = path.join(ApiRoutes.Users, id);
    const response = await api.put(url, changeData);
    return response.data;
  }

  public static async Delete(id: string) {
    const url = path.join(ApiRoutes.Users, id);
    const response = await api.delete(url);
    return response.data;
  }
}