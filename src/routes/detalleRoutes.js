import express from "express";
import { getDetalle } from "../controllers/detalleController.js";
const router = express.Router();

router.get("/detalle", getDetalle);



export default router;