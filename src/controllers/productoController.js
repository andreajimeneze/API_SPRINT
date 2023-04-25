import express from "express";
import pool from "../../db.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


export const getProductos = async (req, res) => {
    try {
        const result = await pool.query('SELECT p.id, p.nombre, p.precio, p.imagen, p.existencia, p.categoria_id, c.categoria FROM producto p JOIN categoria c ON p.categoria_id = c.id ORDER BY p.id');
        const rows = result.rows;
        if (rows.length <= 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            })
        }
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};


export const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT p.id, p.nombre, p.precio, p.imagen, p.existencia, p.categoria_id, c.categoria FROM producto p JOIN categoria c ON p.categoria_id = c.id WHERE p.id = $1', [id]);
        console.log(result)
        const rows = result.rows;
        if (rows.length > 0) {
            res.json(rows);

        } else {
            return res.status(404).json({
                message: "Producto no encontrado"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

export const addProducto = async (req, res) => {
    try {
        const { nombre } = req.body;
        const result = await pool.query("SELECT nombre FROM producto WHERE nombre = $1", [nombre]);
        if (result.rows.length <= 0) {
            const {nombre, precio, imagen, existencia, categoria_id } = req.body;
            const insertResult = await pool.query("INSERT INTO producto (nombre, precio, imagen, existencia, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [nombre, precio, imagen, existencia, categoria_id]);
            const rows = insertResult.rows;
 
            res.send({
                id: rows.insertId,
                nombre,
                precio,
                imagen,
                existencia,
                categoria_id
            });
        } else {
            return res.status(409).json({ message: "Ya existe un producto con el mismo nombre" });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

export const deletePdto = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE from producto WHERE id = $1 RETURNING *", [id]);
        const rows = result.rows;
        if (rows.length === 0) {
            return res.status(404).json({ message: "Registro no Existe" })
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

export const updatePdto = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT nombre FROM producto WHERE id = $1", [id]);
        console.log(result.rows.length)
        if(result.rows.length === 1){ 
        const { nombre, precio, imagen, existencia, categoria_id } = req.body;
        const { id } = req.params;
        const resultado = await pool.query("UPDATE producto SET nombre = COALESCE($1,nombre), precio = COALESCE($2,precio), imagen = COALESCE($3,imagen), existencia = COALESCE($4, existencia), categoria_id = COALESCE($5, categoria_id) WHERE id = $6 RETURNING *", [nombre, precio, imagen, existencia, categoria_id, id])
        res.json(resultado.rows[0])
        } else {
            return res.status(404).json({ message: "Registro no Existe" })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};
