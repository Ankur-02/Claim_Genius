import db from "../config/db";
import { User, getUsertype} from '../types/type';

export const putData = async (first_name: string, last_name: string, dob: string, mob_no: string, address: string): Promise<void> => {
    const data = await db.query(`INSERT INTO students (first_name, last_name, dob, mob_no, address, myFile) VALUES (?,?,?,?,?)`, [first_name, last_name, dob, mob_no, address]);
}

export const deleteData = async (studentId: number): Promise<void> => {
    await db.query("DELETE FROM students WHERE id = ?", [studentId])
}

export const updateData = async (first_name: string, last_name: string, dob: string, mob_no: string, address: string, studentID: number): Promise<void> => {
    await db.query(`UPDATE students SET first_name=?, last_name=?, dob=?, mob_no=?, address=?, myFile=? WHERE id=?`, [first_name, last_name, dob, mob_no, address, studentID])
}

export const checkId = async (studentID: number): Promise<number> => {
    const [rows] = await db.query(`SELECT COUNT(*) as count from students WHERE id = ?`, [studentID]);
    const [{ count }] = rows as { count: number }[];
    return count;
}

export const calcSearchTotal = async (dataFetch: string): Promise<number> => {
    const [rows] = await db.query(`SELECT COUNT(id) as total FROM students WHERE first_name like '%${dataFetch}%' OR last_name like '%${dataFetch}%' OR dob like '%${dataFetch}%' OR mob_no like '%${dataFetch}%' OR address like '%${dataFetch}%' OR myFile like '%${dataFetch}%'`);
    const [{ total }] = rows as { total: number }[];
    return total;
}

export const getQuery = async (pageNo: number, noOfData: number, dataFetch: string, sortType: string, colName: string): Promise<User[]> => {
    const calc = (pageNo - 1) * noOfData;
    const [data] = await db.query(`SELECT * FROM students WHERE first_name like '%${dataFetch}%' OR last_name like '%${dataFetch}%' OR dob like '%${dataFetch}%' OR mob_no like '%${dataFetch}%' OR address like '%${dataFetch}%' OR myFile like '%${dataFetch}%' ORDER BY ${colName} ${sortType} LIMIT ${noOfData} OFFSET ${calc}`);
    return data as User[];
}


export const putImage = async (user_id:number,image: string): Promise<void> => {
    const data = await db.query(`INSERT INTO images (user_id,image) VALUES (?,?)`, [user_id,image]);
    return;
}


export const getImage = async (user_id:number): Promise<getUsertype[]> => {
    const [data] = await db.query(`SELECT image FROM images WHERE user_id = ?`, [user_id]);
    return data as getUsertype[];
}

export const updateImage = async(user_id:number,image: string): Promise<void> => {
    await db.query(`Update images SET image = ? WHERE user_id = ?`, [image, user_id]);
}