import express from "express";
import pool from "../../db.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

export const getCompras = async (req, res) => {
    try {
    
        const resultado = await pool.query("SELECT c.fecha, c.monto, COALESCE(r.rut, 'sin rut') AS rut FROM compra c LEFT JOIN registrousuario r ON c.id_usuario = r.id ORDER BY c.id_usuario");

        const rows = resultado.rows;

        if (rows.length > 0) {
            res.json(rows);
        } else {
            return res.status(404).json({
                message: "Compra no encontrada"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        });
    }
};

export const getCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query("SELECT c.fecha, c.monto, COALESCE(r.rut, 'sin rut') AS rut FROM compra c LEFT JOIN registrousuario r ON c.id_usuario = r.id WHERE c.id = $1 ORDER BY c.id_usuario", [id]);
        const rows = resultado.rows;

        if (rows.length > 0) {
            res.json(rows);
        } else {
            return res.status(404).json({
                message: "Compra no encontrada"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        });
    }
};

export const setCompra = async (req, res) => {
    try {
        const fecha = new Date().toLocaleDateString();
        const { monto, id_usuario } = req.body;
        const resultado = await pool.query("INSERT INTO compra (fecha, monto, id_usuario) VALUES ($1, $2, $3) RETURNING *", [fecha, monto, id_usuario]);
        console.log(resultado);
        res.json(resultado.rows[0]);
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
        const resultado = await pool.query("UPDATE compra SET fecha = $1, monto = $2, id_usuario = $3 WHERE id = $4 RETURNING *", [fecha, monto, id_usuario])
        console.log(resultado),
            res.json({})
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        });
    }
};

