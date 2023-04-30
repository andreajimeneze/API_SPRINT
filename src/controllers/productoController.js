import express from "express";
import pool from "../../db.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// OBTENER PRODUCTOS CON CATEGORÍAS ORDENADOS POR ID (TABLA PRODUCTOS JOIN CON TABLA CATEGORÍA) --- OBTIENE PRODUCTOS SÓLO CON ESTADO DISPONIBLE PARA CARGAR LA TIENDA
export const getProductos = async (req, res) => {
    try {
        const result = await pool.query('SELECT p.id, p.nombre, p.precio, p.imagen, p.existencia, p.categoria_id, c.categoria, p.id_estado FROM producto p JOIN categoria c ON p.categoria_id = c.id WHERE id_estado = 1 ORDER BY p.id');
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

// OBTENER PRODUCTOS CON CATEGORÍAS ORDENADOS POR ID (TABLA PRODUCTOS JOIN CON TABLA CATEGORÍA) --- OBTIENE PRODUCTOS INDEPENDIENTE DEL ESTADO PARA MANEJAR EL MANTENEDOR
export const getPdtosEstado = async (req, res) => {
    try {
        const result = await pool.query('SELECT p.id, p.nombre, p.precio, p.imagen, p.existencia, p.categoria_id, c.categoria, p.id_estado, e.descripcion FROM producto p JOIN categoria c ON p.categoria_id = c.id JOIN estado e ON p.id_estado = e.id  ORDER BY p.id');
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


// OBTENER UN PRODUCTO POR SU ID
export const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT p.id, p.nombre, p.precio, p.imagen, p.existencia, p.categoria_id, c.categoria, p.id_estado FROM producto p JOIN categoria c ON p.categoria_id = c.id WHERE p.id_estado = 1 AND p.id = $1', [id]);
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

// OBTENER PRODUCTOS ORDENADOS POR PRECIO ASCENDENTE
export const getPdtosByPrize = async (req, res) => {
    try {
        const result = await pool.query('SELECT p.id, p.nombre, p.precio, p.imagen, c.categoria p.id_estado FROM producto p JOIN categoria c ON p.categoria_id = c.id WHERE id_estado = 1 ORDER BY p.precio');
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
}

// OBTENER PRODUCTOS ORDENADOS POR CATEGORÍA ASCENDENTE
export const getPdtosByCategory = async (req, res) => {
    try {
        const result = await pool.query('SELECT p.id, p.nombre, p.precio, p.imagen, c.categoria p.id_estado FROM producto p JOIN categoria c ON p.categoria_id = c.id WHERE p.id_estado = 1 ORDER BY c.categoria');
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
}

// OBTENER CANTIDAD DE PRODUCTOS POR CATEGORÍA (GROUP BY)
export const getPdtosByIdGroupCat = async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(p.id) AS cantidad, c.categoria p.id_estado FROM producto p JOIN categoria c ON p.categoria_id = c.id WHERE p.id_estado = 1 GROUP BY c.categoria ORDER BY cantidad');
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
}

// OBTENER PRODUCTOS ORDENADOS POR NOMBRE ASCENDENTE
export const getPdtosByName = async (req, res) => {
    try {
        const result = await pool.query('SELECT p.id, p.nombre, p.precio, p.imagen, c.categoria p.id_estado FROM producto p JOIN categoria c ON p.categoria_id = c.id WHERE p.id_estado = 1 ORDER BY p.nombre');
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
}

// AGREGAR PRODUCTO A LA BASE DE DATOS
export const addProducto = async (req, res) => {
    try {
        const { nombre } = req.body;
        const result = await pool.query("SELECT nombre FROM producto WHERE id_estado = 1 AND nombre = $1", [nombre]);
        if (result.rows.length <= 0) {
            const { nombre, precio, imagen, existencia, categoria_id, id_estado } = req.body;
            const insertResult = await pool.query("INSERT INTO producto (nombre, precio, imagen, existencia, categoria_id, id_estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nombre, precio, imagen, existencia, categoria_id, id_estado]);
            const rows = insertResult.rows;

            res.send({
                id: rows.insertId,
                nombre,
                precio,
                imagen,
                existencia,
                categoria_id,
                id_estado
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

// ELIMINAR PRODUCTO DE LA BASE DE DATOS
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

// MODIFICAR PRODUCTO EN LA BASE DE DATOS
export const updatePdto = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT nombre FROM producto WHERE id = $1", [id]);
        console.log(result.rows)
        if (result.rows.length === 1) {
            const { nombre, precio, imagen, existencia, categoria_id, id_estado } = req.body;
            const { id } = req.params;
            const resultado = await pool.query("UPDATE producto SET nombre = COALESCE($1,nombre), precio = COALESCE($2,precio), imagen = COALESCE($3,imagen), existencia = COALESCE($4, existencia), categoria_id = COALESCE($5, categoria_id), id_estado = COLAESCE($6, id_estado) WHERE id = $7 RETURNING *", [nombre, precio, imagen, existencia, categoria_id, id_estado, id])
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
