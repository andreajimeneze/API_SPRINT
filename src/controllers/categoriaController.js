import express from "express";
import pool from "../../db.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



// RUTA PARA CATEGORÍA ORDER BY ID
export const getCategorias = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT id, categoria, imgCategoria FROM categoria ORDER BY id');

        res.json(resultado.rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

export const getCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT id, categoria FROM categoria WHERE id = $1', [id]);
        if (resultado.rows.length === 1) {
            res.json(resultado.rows);
        } else {
            return res.status(404).json({
                message: "Categoría no existe"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

export const addCategoria = async (req, res) => {
    try {
        const { categoria } = req.body;
        const resultado = await pool.query('SELECT id, categoria FROM categoria WHERE categoria = $1', [categoria]);
        if (resultado.rows.length === 1) {
            res.json({
                message: "Categoría ya existe"
            })
        } else {
            const { categoria } = req.body;
            const resultado = await pool.query('INSERT INTO categoria (categoria) VALUES ($1) RETURNING id', [categoria]);
            console.log(resultado)
            res.json({});
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }

};

export const deleteCateg = async (req, res) => {
    try {
        const { id } = req.params
        const resultado = await pool.query("delete from categoria where id=$1 RETURNING id", [id]);
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

export const updateCateg = async (req, res) => {
    const { categoria } = req.body;
    const resultado = await pool.query("UPDATE categoria set categoria =$1 WHERE id=$2", [categoria, id]);
    console.log(resultado),
        res.json({})
};

export default router;