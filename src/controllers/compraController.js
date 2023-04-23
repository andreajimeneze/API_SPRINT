import express from "express";
import pool from "../../conect.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


export const getCompra = async (req, res) => {
    try {
    const resultado = await pool.query('SELECT c.fecha, c.monto, c.id_usuario, r.nombres, r.apellidos FROM compra c JOIN registrousuario r ON c.id_usuario = r.id ORDER BY r.id');
    res.json(resultado.rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        });
    }
};

export const addCompra = async (req, res) => {
    try { 
    const { fecha, monto, id_usuario } = req.body;
    const resultado = await pool.query("INSERT INTO compra (fecha, monto, id_usuario) VALUES ($1, $2, $3)", [fecha, monto, id_usuario]);
    console.log(resultado);
    res.json({})
} catch (error) {
    return res.status(500).json({
        message: "Algo salió mal. Intente más tarde"
    });
}
};

export const deleteCompra = async (req, res) => {
    try {
        const { id } = req.body
        const resultado = await pool.query("DELETE from compra WHERE id = $1 RETURNING *", [id]);
        if (resultado.rows) {
            res.status(200).json({ id: resultado.rows[0].id })
        } else {
            res.status(404).json({ error: "Registro no Existe" })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        });
    }
};

export const updateCompra = async (req, res) => {
    try { 
        const { fecha, monto, id_usuario } = req.body;
        const resultado = await pool.query("UPDATE compra SET fecha = $1, monto = $2, id_usuario = $3 WHERE id = $4 RETURNING *", [fecha, monto, id_usuario ])
        console.log(resultado),
        res.json({})
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        });
    }
};

