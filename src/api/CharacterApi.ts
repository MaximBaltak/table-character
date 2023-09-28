import api from "@/api/index";
import { AxiosResponse } from "axios";

export class CharacterApi{

   public static async getCharacter (page: number): Promise<AxiosResponse> {
        return api.get(`character?page=${page}`)
    }
}

