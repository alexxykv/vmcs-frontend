import { ChannelInvitationRequestData } from "../interfaces/dto/channelInvitations";
import { api } from "./Api";


export class ChannelInvitations {
  public static async Accept(id: string) {
    const response = await api.get(`channelInvitation/accept/${id}`);
    return response.data;
  }

  public static async Delete(id: string) {
    const response = await api.get(`channelInvitation/delete/${id}`);
    return response.data;
  }

  public static async Decline(id: string) {
    const response = await api.get(`channelInvitation/decline/${id}`);
    return response.data;
  }

  public static async Create(data: ChannelInvitationRequestData) {
    const response = await api.post(`channelInvitation/create`, data);
    return response.data;
  }
}