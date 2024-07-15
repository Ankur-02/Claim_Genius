import db from "../config/db";
import { LoginUser} from '../types/type';

export const putUser = async (name: string, email: string, password: string): Promise<void> => {
    const data = await db.query(`INSERT INTO login (name, email, password) VALUES (?,?,?)`, [name, email, password]);
}


export const getUser = async (email: string, password: string): Promise<LoginUser[]> => {
    const [data] = await db.query(`SELECT * FROM login WHERE email=? and password=?`, [email, password]);
    return data as LoginUser[];
}


export const checkAccount = async (email: string): Promise<LoginUser[]> => {
    const [data] = await db.query(`SELECT * FROM login WHERE email=?`, [email]);
    return data as LoginUser[];
}
