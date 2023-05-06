import express from "express";
import { getCompra, getCompras, realizarCompra } from "../controllers/compraController.js";
const router = express.Router();

router.get("/compra", getCompras);

router.get("/compra/:id", getCompra);

router.post("/compra", realizarCompra);


export default router;