import express from "express";
import pool from "../../db.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

export const getDocument = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT id, tipo_documento, numero FROM documento');

        res.json(resultado.rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

export const setDocument = async (req, res) => {
    try {
        const { nombre } = req.body;
        const result = await pool.query("SELECT nombre FROM documento WHERE nombre = $1", [ nombre ]);
        if (result.rows.length === 0) {
        const { tipo_documento, numero } = req.body;
        const insertResult = await pool.query("INSERT INTO documento (tipo_documento, numero) VALUES ($1, $2) RETURNING id", [ tipo_documento, numero ]);
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

export const deleteDoc = async (req, res) => {
    try {
        const { id } = req.params
        const resultado = await pool.query("DELETE from documento WHERE id = $1 RETURNING id", [ id ]);
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

export const updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT tipo_documento, numero FROM documento WHERE id = $1", [ id ]);

        if (result.rows.length === 1) {
            const { tipo_documento, numero } = req.body;
            const { id } = req.params;
            const resultado = await pool.query("UPDATE documento SET tipo_documento = $1, numero = $2 WHERE id = $3 RETURNING nombre", [ tipo_documento, numero, id ])
            
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

