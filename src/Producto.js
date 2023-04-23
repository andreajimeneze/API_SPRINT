import express from "express";
import pool from "../conect.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// router.get("/producto", async (req, res) => {
//     const resultado = await pool.query('SELECT * FROM producto');
//     res.json(resultado.rows);
// });

router.get("/producto", async (req, res) => {
    const resultado = await pool.query('SELECT p.id, p.nombre, p.precio, p.imagen, p.existencia, p.categoria_id, c.categoria FROM producto p JOIN categoria c ON p.categoria_id = c.id ORDER BY p.id');
    res.json(resultado.rows);
})

router.get("/producto/:id",async (req, res) => {
    const { id } = req.body;
    const resultado = await pool.query('SELECT p.*, c.categoria FROM producto p JOIN categoria c ON p.categoria_id = c.id WHERE c.id = $1', [id]);
    res.json(resultado.rows);
})

router.post("/producto", async (req, res) => {
    const { nombre, precio, img, exist, categ } = req.body;
    const resultado = await pool.query("INSERT INTO producto (nombre, precio, imagen , existencia, categoria_id) VALUES ($1, $2, $3, $4, $5)", [nombre, precio, img, exist, categ]);
    console.log(resultado);
    res.json({})
});

router.delete("/producto/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query("DELETE from producto WHERE id = $1 RETURNING *", [id]);
        if (resultado.rows) {
            res.status(200).json({ id: resultado.rows[0].id })
        } else {
            res.status(404).json({ error: "Registro no Existe" })
        }
    } catch (e) {
        res.status(500).json({ error: e })
    }
});

router.put("/producto/:id", async (req, res) => {
    try { 
    const { nombre, precio, imagen, existencia, categ} = req.body;
    const { id } = req.params;
    const resultado = await pool.query("UPDATE producto SET nombre = $1, precio = $2, imagen = $3, existencia = $4, categoria_id = $5 WHERE id = $6 RETURNING *", [nombre, precio, imagen, existencia, categ, id])
    console.log(resultado),
    res.json({})
} catch(e) {
    console.log(e)
}
});

export default router;