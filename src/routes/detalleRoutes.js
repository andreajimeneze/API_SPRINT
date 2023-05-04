import express from "express";
import { deleteDetalle, getDetalle } from "../controllers/detalleController.js";
const router = express.Router();

router.get("/detalle", getDetalle);
router.delete("/detalle/:id", deleteDetalle);


export default router;