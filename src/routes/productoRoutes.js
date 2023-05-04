import express from "express";
const router = express.Router();
import { getProductos, getPdtosEstado, getProducto, getPdtosByPrizeAsc, getPdtosByPrizeDesc, getPdtosByCategory, getPdtosByCategoryDesc, getCantPdtoGroupCat, getPdtosByNameAsc, getPdtosByNameDesc, addProducto, deletePdto, updatePdto } from "../controllers/productoController.js";


router.get("/producto", getProductos);

router.get("/producto/estado", getPdtosEstado);

router.get("/producto/prizea", getPdtosByPrizeAsc);

router.get("/producto/prizez", getPdtosByPrizeDesc);

router.get("/producto/category", getPdtosByCategory);

router.get("/producto/categoryz", getPdtosByCategoryDesc);

router.get("/producto/categ", getCantPdtoGroupCat);

router.get("/producto/namea", getPdtosByNameAsc);

router.get("/producto/namez", getPdtosByNameDesc);

router.get("/producto/:id", getProducto);

router.post("/producto", addProducto);

router.delete("/producto/:id", deletePdto);

router.patch("/producto/:id", updatePdto);


export default router;