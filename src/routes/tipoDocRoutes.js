import express from "express";
import { getTipoDoc, setTipoDoc, deleteTipoDoc, updateTipoDoc } from "../controllers/tipoDocController.js";
const router = express.Router();

router.get("/documento", getTipoDoc);
router.post("/documento", setTipoDoc);
router.delete("/documento/:id", deleteTipoDoc);
router.put("/documento/:id", updateTipoDoc);
export default router;