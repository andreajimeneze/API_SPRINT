import express from "express";
import pool from "../../db.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

export const getTipoDoc = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT id, nombre FROM tipo_documento');

        res.json(resultado.rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

export const setTipoDoc = async (req, res) => {
    try {
        const { nombre } = req.body;
        const result = await pool.query("SELECT nombre FROM tipo_documento WHERE nombre = $1", [ nombre ]);
        if (result.rows.length === 0) {
        const { nombre } = req.body;
        const insertResult = await pool.query("INSERT INTO tipo_documento (nombre) VALUES ($1) RETURNING nombre", [ nombre ]);
        const rows = insertResult.rows;

            res.send({
                id: rows.insertId,
                nombre
            });
        } {
            return res.status(409).json({ message: "tipo documento ya existe" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        });
    }
};

export const deleteTipoDoc = async (req, res) => {
    try {
        const { id } = req.params
        const resultado = await pool.query("DELETE from tipo_documento WHERE id = $1 RETURNING id", [ id ]);
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

export const updateTipoDoc = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT nombre FROM tipo_documento WHERE id = $1", [ id ]);
        console.log(result.rows)

        if (result.rows.length === 1) {
            const { nombre } = req.body;
            const { id } = req.params;
            const resultado = await pool.query("UPDATE tipo_documento SET nombre = $1 WHERE id = $2 RETURNING nombre", [ nombre, id ])
            console.log(resultado.rows),
            res.json(resultado.rows[0])
        } else {
            return res.status(404).json({ message: "Registro no Existe" })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        });
    }
};

