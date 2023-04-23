import express from "express";
const router = express.Router();
import { getProductos, getProducto, addProducto, deletePdto, updatePdto } from "../controllers/productoController.js";


router.get("/producto", getProductos);

router.get("/producto/:id", getProducto);

router.post("/producto", addProducto);

router.delete("/producto/:id", deletePdto);

router.patch("/producto/:id", updatePdto);


export default router;