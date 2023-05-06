import express from "express";
import pool from "../../db.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// OBTENER DETALLE DE COMPRA JOIN CON TABLA COMPRA Y REGISTROUSUARIO ORDENADO POR ID
export const getDetalle = async (req, res) => {
    try { 
    const resultado = await pool.query('SELECT d.id_compra, c.fecha, d.id_pdto, p.nombre, p.precio, d.cantidad, c.monto_bruto, c.id_usuario, u.nombres, u.apellidos FROM detalle_compra d JOIN compra c ON d.id_compra = c.id JOIN producto p ON d.id_pdto = p.id JOIN registrousuario u ON c.id_usuario = u.id ORDER BY d.id');
    res.json(resultado.rows);
} catch (error) {
    return res.status(500).json({
        message: "Algo salió mal. Intente más tarde"
    });
}
};
