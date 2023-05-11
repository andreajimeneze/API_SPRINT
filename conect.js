import dotenv from "dotenv";
dotenv.config();

	export const PORT = process.env.PORT || 4000
	export const HOST = process.env.HOST_DB || "localhost"
	export const USER = process.env.USER_DB || "postgres"
	export const PASS = process.env.PASS_DB || "1234"
	export const PORT_DB = process.env.PORT_DB || 5432
	export const DB = process.env.DB_DB || "pezmosaico"

	
	


