import express from "express";
import { getCompra, addCompra, deleteCompra, updateCompra } from "../controllers/compraController.js";
const router = express.Router();

router.get("/compra", getCompra);

router.post("/compra", addCompra);

router.delete("/compra/:id", deleteCompra);

router.put("/compra/:id", updateCompra);


export default router;