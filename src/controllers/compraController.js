import express from "express";
import pool from "../../db.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// OBTENER COMPRAS ORDENADAS POR USUARIO
export const getCompras = async (req, res) => {
    try {
    
        const resultado = await pool.query("SELECT c.fecha, c.monto_neto, c.impuesto, c.monto_bruto, c.gasto_envio COALESCE(r.rut, 'sin rut') AS rut FROM compra c LEFT JOIN registrousuario r ON c.id_usuario = r.id ORDER BY c.id_usuario");

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

// OBTENER COMPRA POR ID 
export const getCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query("SELECT c.fecha, c.monto_neto, c.impuesto, c.monto_bruto, c.gasto_envio, COALESCE(r.rut, 'sin rut') AS rut FROM compra c LEFT JOIN registrousuario r ON c.id_usuario = r.id WHERE c.id = $1 ORDER BY c.id_usuario", [id]);
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

// AGREGAR COMPRA TRANSACCIÓN PARA INCORPORAR INFORMACIÓN EN TABLA COMPRA - DETALLE COMPRA Y MODIFICAR EXISTENCIA DE PRODUCTOS

export const realizarCompra = async (compra) => {
    const { fecha, monto_neto, id_usuario, impuesto, monto_bruto, gasto_envio, productos } = compra;
  
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
  
      // Insertar la compra en la tabla "compra"
      const { rows: [ compraInsertada ] } = await client.query(`
        INSERT INTO compra (fecha, monto_neto, id_usuario, impuesto, monto_bruto, gasto_envio)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id_compra
      `, [ fecha, monto_neto, id_usuario, impuesto, monto_bruto, gasto_envio ]);
  
      // Insertar los productos comprados en la tabla "detalle_compra"
      for (const producto of productos) {
        await client.query(`
          INSERT INTO detalle_compra (id_compra, id_producto, cantidad)
          VALUES ($1, $2, $3)
        `, [ compraInsertada.id_compra, producto.id_producto, producto.cantidad]);
  
        // Actualizar la cantidad de productos en la tabla "productos"
        await client.query(`UPDATE productos SET existencia = existencia - $1 WHERE id_producto = $2`, [producto.cantidad, producto.id_producto]);
      }
  
      await client.query('COMMIT');
      console.log('Compra realizada con éxito');
    } catch (error) {
      await client.query('ROLLBACK');
      console.log('Compra cancelada');
      throw error;
    } finally {
      client.release();
    }
  };
  






// export const realizarCompra = async (req, res) => {
//     try {
//         const fecha = new Date().toLocaleDateString();
//         const { monto_neto, id_usuario, impuesto, monto_bruto, gasto_envio } = req.body;
//         const resultado = await pool.query("INSERT INTO compra (fecha, monto_neto, id_usuario, impuesto, monto_bruto, gasto_envio ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_usuario", [ fecha, monto_neto, id_usuario, impuesto, monto_bruto, gasto_envio ]);
//         console.log(resultado);
//         res.json(resultado.rows[0]);
//     } catch (error) {
//         return res.status(500).json({
//             message: "Algo salió mal. Intente más tarde"
//         });
//     }
// };

// ELIMINAR COMPRA 
export const deleteCompra = async (req, res) => {
    try {
        const { id } = req.params
        const resultado = await pool.query("DELETE from compra WHERE id = $1 RETURNING id", [id]);
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

// MODIFICAR COMPRA
// export const updateCompra = async (req, res) => {
//     try {
//         const { fecha, monto_neto, id_usuario, impuesto, monto_bruto, gasto_envio } = req.body;
//         const resultado = await pool.query("UPDATE compra SET fecha = $1, monto_neto = $2, id_usuario = $3, impuesto, monto_bruto, gasto_envio WHERE id = $4 RETURNING fecha, monto_bruto, id_usuario", [ fecha, monto_neto, id_usuario, impuesto, monto_bruto, gasto_envio ])
//         console.log(resultado),
//             res.json({})
//     } catch (error) {
//         return res.status(500).json({
//             message: "Algo salió mal. Intente más tarde"
//         });
//     }
// };

