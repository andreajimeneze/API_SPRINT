import pg from "pg";
import { DB, HOST, PASS, PORT_DV, USER } from "../API/conect.js"
const { Pool } = pg;

const pool = new Pool({
	host     : HOST,
	user     : USER,
	password : PASS,
	port	 : PORT_DV,
	database : DB
})


export default pool;