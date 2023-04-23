import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;
dotenv.config();

const pool = new Pool({
	// host     : process.env.HOST_DB,
	// user     : process.env.USER_DB,
	// password : process.env.PASS_DB,
	// port	 : process.env.PORT_DB,
	// database : process.env.DB_DB

	host     : "localhost",
	user     : "postgres",
	password : "1234",
	port	 : 5432,
	database : "pezmosaico"

})

export default pool;
