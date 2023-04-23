import express from "express";
import pool from "../conect.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/compra", async (req, res) => {
    const resultado = await pool.query('SELECT c.fecha, c.monto, c.id_usuario, r.nombres, r.apellidos FROM compra c JOIN registrousuario r ON c.id_usuario = r.id ORDER BY r.id');
    res.json(resultado.rows);
});

router.post("/compra", async (req, res) => {
    const { fecha, monto, id_usuario } = req.body;
    const resultado = await pool.query("INSERT INTO compra (fecha, monto, id_usuario) VALUES ($1, $2, $3)", [fecha, monto, id_usuario]);
    console.log(resultado);
    res.json({})
});

router.delete("/compra/:id", async (req, res) => {
    try {
        const { id } = req.body
        const resultado = await pool.query("DELETE from compra WHERE id = $1 RETURNING *", [id]);
        if (resultado.rows) {
            res.status(200).json({ id: resultado.rows[0].id })
        } else {
            res.status(404).json({ error: "Registro no Existe" })
        }
    } catch (e) {
        res.status(500).json({ error: e })
    }
});

router.put("/compra/:id", async (req, res) => {
    try { 
        const { fecha, monto, id_usuario } = req.body;
        const resultado = await pool.query("UPDATE compra SET fecha = $1, monto = $2, id_usuario = $3 WHERE id = $4 RETURNING *", [fecha, monto, id_usuario ])
        console.log(resultado),
        res.json({})
    } catch(e) {
        console.log(e)
    }
});

export default router;