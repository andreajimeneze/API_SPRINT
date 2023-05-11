import express from "express";
import { getDocument, setDocument, deleteDoc, updateDocument } from "../controllers/documentoController.js";
const router = express.Router();

router.get("/documento", getDocument);
router.post("/documento", setDocument);
router.delete("/documento/:id", deleteDoc);
router.put("/documento/:id", updateDocument);
export default router;