import { Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
  token: string;
}


export interface UserParams {
    id: string;
}
  
export interface QueryParams {
    pageNo?: string;
    noOfData?: string;
    dataFetch?: string;
    sortType?: string;
    colName?: string;
}

export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    dob: string;
    mob_no: string;
    address: string;
}

export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: User[];
    searchTotal?: number;
    error?:unknown;
}

export interface LoginUser {
    user_id:number;
    name?: string;
    email: string;
    password: string;
}

export interface getUsertype {
    img_id?:number;
    user_id?:number;
    image: string;
}