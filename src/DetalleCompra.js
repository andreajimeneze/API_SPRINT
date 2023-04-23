import express from "express";
import pool from "../conect.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/detalle", async (req, res) => {
    const resultado = await pool.query('SELECT d.id_compra, c.fecha, d.id_pdto, p.nombre, p.precio, d.cantidad, c.monto, c.id_usuario, u.nombres, u.apellidos FROM detalle_compra d JOIN compra c ON d.id_compra = c.id JOIN producto p ON d.id_pdto = p.id JOIN registrousuario u ON c.id_usuario = u.id ORDER BY d.id');
    res.json(resultado.rows);
});

router.post("/detalle", async (req, res) => {
    const { id_compra, id_pdto, cantidad, existencia } = req.body;
    const resultado = await pool.query("INSERT INTO detalle_compra (id_compra, id_pdto, cantidad, existencia) VALUES ($1, $2, $3, $4)", [id_compra, id_pdto, cantidad, existencia]);
    console.log(resultado);
    res.json({})
});

router.delete("/detalle/:id", async (req, res) => {
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

router.put("/detalle/:id", async (req, res) => {
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