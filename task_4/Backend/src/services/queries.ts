import db from "../config/db";
import { User} from '../types/type';

export const putData = async (first_name: string, last_name: string, dob: string, mob_no: string, address: string): Promise<void> => {
    const data = await db.query(`INSERT INTO students (first_name, last_name, dob, mob_no, address) VALUES (?,?,?,?,?)`, [first_name, last_name, dob, mob_no, address]);
}

export const deleteData = async (studentId: number): Promise<void> => {
    await db.query("DELETE FROM students WHERE id = ?", [studentId])
}

export const updateData = async (first_name: string, last_name: string, dob: string, mob_no: string, address: string, studentID: number): Promise<void> => {
    await db.query(`UPDATE students SET first_name=?, last_name=?, dob=?, mob_no=?, address=? WHERE id=?`, [first_name, last_name, dob, mob_no, address, studentID])
}

export const checkId = async (studentID: number): Promise<number> => {
    const [rows] = await db.query(`SELECT COUNT(*) as count from students WHERE id = ?`, [studentID]);
    const [{ count }] = rows as { count: number }[];
    return count;
}

export const calcSearchTotal = async (dataFetch: string): Promise<number> => {
    const [rows] = await db.query(`SELECT COUNT(id) as total FROM students WHERE first_name like '%${dataFetch}%' OR last_name like '%${dataFetch}%' OR dob like '%${dataFetch}%' OR mob_no like '%${dataFetch}%' OR address like '%${dataFetch}%'`);
    const [{ total }] = rows as { total: number }[];
    return total;
}

export const getQuery = async (pageNo: number, noOfData: number, dataFetch: string, sortType: string, colName: string): Promise<User[]> => {
    const calc = (pageNo - 1) * noOfData;
    const [data] = await db.query(`SELECT * FROM students WHERE first_name like '%${dataFetch}%' OR last_name like '%${dataFetch}%' OR dob like '%${dataFetch}%' OR mob_no like '%${dataFetch}%' OR address like '%${dataFetch}%' ORDER BY ${colName} ${sortType} LIMIT ${noOfData} OFFSET ${calc}`);
    return data as User[];
}
