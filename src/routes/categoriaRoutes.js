import express from "express";
import { getCategorias, getCategoria, addCategoria, deleteCateg, updateCateg } from "../controllers/categoriaController.js";
const router = express.Router();

router.get("/categoria", getCategorias);

router.get("/categoria/:id", getCategoria);

router.post("/categoria", addCategoria);

router.delete("/categoria/:id", deleteCateg);

router.put("/categoria/:id", updateCateg);

export default router;
