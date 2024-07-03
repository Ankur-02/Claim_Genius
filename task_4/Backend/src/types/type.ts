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