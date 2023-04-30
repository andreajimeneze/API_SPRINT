import express from "express";
const router = express.Router();
import { getProductos, getProducto, getPdtosByPrize, getPdtosByCategory, getPdtosByName, addProducto, deletePdto, updatePdto, getPdtosByIdGroupCat } from "../controllers/productoController.js";


router.get("/producto", getProductos);

router.get("/producto/prize", getPdtosByPrize);

router.get("/producto/category", getPdtosByCategory);

router.get("/producto/categ", getPdtosByIdGroupCat);

router.get("/producto/name", getPdtosByName);

router.get("/producto/:id", getProducto);

router.post("/producto", addProducto);

router.delete("/producto/:id", deletePdto);

router.patch("/producto/:id", updatePdto);


export default router;