import path from "path";
import ApiRoutes from "../enums/ApiRoutes";
import { ChannelInvitationRequestData } from "../interfaces/dto/channelInvitations";
import { api } from "./Api";


export class ChannelInvitations {
  public static async Accept(id: string) {
    const url = path.join(ApiRoutes.ChannelInvitations, 'accept', id);
    const response = await api.get(url);
    return response.data;
  }

  public static async Delete(id: string) {
    const url = path.join(ApiRoutes.ChannelInvitations, 'delete', id);
    const response = await api.get(url);
    return response.data;
  }

  public static async Decline(id: string) {
    const url = path.join(ApiRoutes.ChannelInvitations, 'decline', id);
    const response = await api.get(url);
    return response.data;
  }

  public static async Create(data: ChannelInvitationRequestData) {
    const url = path.join(ApiRoutes.ChannelInvitations, 'create');
    const response = await api.post(url, data);
    return response.data;
  }
}