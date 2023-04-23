import express from "express";
import { getDetalle, setDetalle, deleteDetalle, updateDetalle } from "../controllers/detalleController.js";
const router = express.Router();

router.get("/detalle", getDetalle);

router.post("/detalle", setDetalle);

router.delete("/detalle/:id", deleteDetalle);

router.put("/detalle/:id", updateDetalle);

export default router;