import express from "express";
import { getCompra, getCompras, setCompra, deleteCompra, updateCompra } from "../controllers/compraController.js";
const router = express.Router();

router.get("/compra", getCompras);

router.get("/compra/:id", getCompra);

router.post("/compra", setCompra);

router.delete("/compra/:id", deleteCompra);

router.put("/compra/:id", updateCompra);


export default router;