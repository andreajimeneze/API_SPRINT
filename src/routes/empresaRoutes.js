import express from "express";
import { getdatosEmpresa, setEmpresa, deleteEmpresa, updateEmpresa } from "../controllers/empresaController.js";
const router = express.Router();

router.get("/empresa", getdatosEmpresa);
router.post("/empresa", setEmpresa);
router.delete("/empresa/:id", deleteEmpresa);
router.patch("/empresa/:id", updateEmpresa);

export default router;