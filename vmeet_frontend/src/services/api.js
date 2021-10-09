import { api } from "../utilities";
import httpService from "./httpService";


export function signUp(data){
    httpService.post(api.BASE_URL + api.SIGNUP_URL,data).then(response=>{
        return response;
    }).catch(err=>{
        return err.stack;
    })
}