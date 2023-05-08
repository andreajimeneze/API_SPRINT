import express from "express";
import pool from "../../db.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

export const getdatosEmpresa = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT nombre, rut, direccion, telefono, email FROM datos_empresa');

        res.json(resultado.rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

export const setEmpresa = async (req, res) => {
    try {
        const { nombre } = req.body;
        const result = await pool.query("SELECT nombre FROM datos_empresa WHERE nombre = $1", [ nombre ]);
        if (result.rows.length === 0) {
        const { nombre: nombre_empresa, direccion, telefono, email, rut } = req.body;
        const insertResult = await pool.query("INSERT INTO datos_empresa (nombre, direccion, telefono, email, rut) VALUES ($1, $2, $3, $4, $5) RETURNING id", [ nombre_empresa, direccion, telefono, email, rut ]);
        const rows = insertResult.rows;

            res.send({
                id: rows.insertId,
                nombre,
                direccion,
                telefono, 
                email,
                rut
            });
        } {
            return res.status(409).json({ message: "Empresa ya existe" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        });
    }
};

export const deleteEmpresa = async (req, res) => {
    try {
        const { id } = req.params
        const resultado = await pool.query("DELETE from datos_empresa WHERE id = $1 RETURNING id", [id]);
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

export const updateEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT nombre FROM datos_empresa WHERE id = $1", [ id ]);
        
        if (result.rows.length === 1) {
            const { nombre, direccion, telefono, email, rut } = req.body;
            const { id } = req.params;
            const resultado = await pool.query("UPDATE datos_empresa SET nombre = COALESCE($1, nombre), direccion = COALESCE($2, direccion), telefono = COALESCE($3, telefono) , email = COALESCE($4, email), rut = COALESCE($5, rut) WHERE id = $6 RETURNING nombre", [ nombre,direccion, telefono, email, rut, id ])
            
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

