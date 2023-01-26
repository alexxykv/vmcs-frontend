import path from "path";
import ApiRoutes from "../enums/ApiRoutes";
import { PushToRepositoryData } from "../interfaces/dto";
import { api } from "./Api";

export default class Github {
  public static CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  public static async PushToRepository(pushToRepository: PushToRepositoryData) {
    const url = path.join(ApiRoutes.Github, 'repository', 'push');
    const response = await api.post(url, pushToRepository);
    return response.data;
  }
}