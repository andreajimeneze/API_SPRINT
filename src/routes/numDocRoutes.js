import express from "express";
import {  } from "../controllers/numController.js";
const router = express.Router();

router.get("/documento/numero");
router.post("/documento/numero");
router.delete("/documento/numero");
router.put("/documento/numero");

export default router;