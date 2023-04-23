import express from "express";
import pool from "../conect.js";
import CryptoJS from "crypto-js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/usuario", async (req, res) => {
    const resultado = await pool.query('SELECT usuario, password FROM registrousuario');
    res.json(resultado.rows);
});

router.post("/usuario", async (req, res) => {
    const { nombres, apellidos, rut, direccion, telefono, email, usuario } = req.body;
    const password = CryptoJS.SHA256(req.body.password).toString();
    const resultado = await pool.query(`INSERT INTO registrousuario (nombres, apellidos, rut, direccion, telefono, email, usuario, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [nombres, apellidos, rut, direccion, telefono, email, usuario, CryptoJS.SHA256(password).toString()])
    console.log(resultado),
    res.json({})
});

export default router;

