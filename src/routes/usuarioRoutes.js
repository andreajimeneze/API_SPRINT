import express from "express";
import { getUsuarios, getUsuario, setUsuario } from "../controllers/usuarioController.js";
const router = express.Router();

router.get("/usuario", getUsuarios);

router.get("/usuario/:id", getUsuario)

router.post("/usuario", setUsuario);

export default router;