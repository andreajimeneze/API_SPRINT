import express from "express";
import pool from "../../db.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// OBTENER ESTADO ORDER BY ID
export const getEstados = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT id, descripcion FROM estado ORDER BY id');

        res.json(resultado.rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

// OBTENER ESTADO POR ID
export const getEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT id, descripcion FROM estado WHERE id = $1', [id]);
        if (resultado.rows.length === 1) {
            res.json(resultado.rows);
        } else {
            return res.status(404).json({
                message: "Estado no existe"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

// AGREGAR ESTADO
export const addEstado = async (req, res) => {
    try {
        const { descripcion } = req.body;
        const resultado = await pool.query('SELECT id, descripcion FROM estado WHERE descripcion = $1', [descripcion]);
        if (resultado.rows.length === 1) {
            res.json({
                message: "Estado ya existe"
            })
        } else {
            const { descripcion } = req.body;
            const resultado = await pool.query('INSERT INTO estado (descripcion) VALUES ($1) RETURNING id', [descripcion]);
            console.log(resultado)
            res.json({});
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }

};

// ELIMINAR ESTADO
export const deleteEstado = async (req, res) => {
    try {
        const { id } = req.params
        const resultado = await pool.query("delete from estado where id=$1 RETURNING id", [id]);
        if (resultado.rows.length === 1) {
            res.status(200).json({ id: resultado.rows[0].id })
        } else {
            res.status(404).json({ error: "Registro no Existe" })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

// ACTUALIZAR ESTADO
export const updateEstado = async (req, res) => {
    const { id } = req.params
    const { descripcion } = req.body;
    const resultado = await pool.query("UPDATE estado set descripcion =$1 WHERE id=$2", [descripcion, id]);
    console.log(resultado),
        res.json({})
};

export default router;