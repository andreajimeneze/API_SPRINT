import express from "express";
import { getEstados, getEstado, addEstado, deleteEstado, updateEstado } from "../controllers/estadoController.js";
const router = express.Router();

router.get("/estado", getEstados);

router.get("/estado/:id", getEstado);

router.post("/estado", addEstado);

router.delete("/estado/:id", deleteEstado);

router.put("/estado/:id", updateEstado);

export default router;
