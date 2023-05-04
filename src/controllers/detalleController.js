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

// AGREGAR DETALLE DE COMPRA 
//  export const setDetalle = async (req, res) => {
//     try { 
//     const { id_compra, id_pdto, cantidad } = req.body;
//     const resultado = await pool.query("INSERT INTO detalle_compra (id_compra, id_pdto, cantidad) VALUES ($1, $2, $3) RETURNING", [ id_compra, id_pdto, cantidad ]);
//     console.log(resultado);
//     res.json(resultado.rows)
//     } catch (error) {
//         return res.status(500).json({
//             message: "Algo salió mal. Intente más tarde"
//         });
//     }
// };

// ELIMINAR DETALLE DE COMPRA
export const deleteDetalle = async (req, res) => {
    try {
        const { id } = req.params
        const resultado = await pool.query("DELETE from detalle_compra WHERE id = $1 RETURNING id", [ id ]);
        if (resultado.rows === 1) {
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

// MODIFICAR DETALLE COMPRAS
// export const updateDetalle = async (req, res) => {
//     try { 
//         const { fecha, monto, id_usuario } = req.body;
//         const resultado = await pool.query("UPDATE compra SET fecha = $1, monto = $2, id_usuario = $3 WHERE id = $4 RETURNING *", [fecha, monto, id_usuario ])
//         console.log(resultado),
//         res.json({})
//     } catch (error) {
//         return res.status(500).json({
//             message: "Algo salió mal. Intente más tarde"
//         });
//     }
// };

