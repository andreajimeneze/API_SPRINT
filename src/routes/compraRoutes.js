import express from "express";
import { getCompra, getCompras, realizarCompra, deleteCompra } from "../controllers/compraController.js";
const router = express.Router();

router.get("/compra", getCompras);

router.get("/compra/:id", getCompra);

router.post("/compra", realizarCompra);

router.delete("/compra/:id", deleteCompra);

// router.put("/compra/:id", updateCompra);


export default router;