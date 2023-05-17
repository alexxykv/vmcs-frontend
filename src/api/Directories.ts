import { ApiRoutes } from "../enums";
import { CreateDirectoryData, DirectoryData } from "../interfaces/dto";
import { api } from "./Api";
import path from "path";

export default class Directories {
  public static async Create(createData: CreateDirectoryData) {
    const url = path.join(ApiRoutes.Directories);
    const response = await api.post(url, createData);
    const data = response.data as string;
    return data;
  }

  public static async Get(directoryId: string) {
    const url = path.join(ApiRoutes.Directories, directoryId);
    const response = await api.get(url);
    const data = response.data as DirectoryData;
    return data;
  }

  public static async Delete() {
    const url = path.join(ApiRoutes.Directories);
    const response = await api.delete(url);
    return response.data;
  }
}