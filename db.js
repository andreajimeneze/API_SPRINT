import pg from "pg";
import { DB, HOST, PASS, PORT_DV, USER } from "../API/conect.js"
const { Pool } = pg;

const pool = new Pool({
	host     : HOST,
	user     : USER,
	password : PASS,
	port	 : PORT_DV,
	database : DB

	// host     : "localhost",
	// user     : "postgres",
	// password : "1234",
	// port	 : 5432,
	// database : "pezmosaico"

})


export default pool;