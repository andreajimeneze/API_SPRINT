import express from "express";
import pool from "../../db.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// OBTENER COMPRAS ORDENADAS POR USUARIO
export const getCompras = async (req, res) => {
    try {

        // const resultado = await pool.query("SELECT c.id, c.fecha, c.monto_neto, c.impuesto, c.monto_bruto, c.gasto_envio COALESCE(r.rut, 'sin rut') AS rut FROM compra c LEFT JOIN registrousuario r ON c.id_usuario = r.id ORDER BY c.id");

        const resultado = await pool.query("SELECT id, fecha, monto_neto, impuesto, monto_bruto, gasto_envio FROM compra  ORDER BY id");

        const rows = resultado.rows;

        if (rows.length <= 0) {
            return res.status(404).json({
                message: "Compra no encontrada"
            })
           
        } else {
            res.json(rows);
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
            console.log(rows)
            res.json({ success: true, rows });
        } else {
            return res.status(404).json({ success: false,
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

export const realizarCompra = async (req, res) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const { fecha, monto_neto, id_usuario, impuesto, monto_bruto, gasto_envio } = req.body.compra;
        
        const productos = req.body.productos.map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            cantidad: p.cantidad
        }));
       
      // Insertar la compra en la tabla "compra"
      const compraInsertada = await client.query(
        'INSERT INTO compra (fecha, monto_neto, id_usuario, impuesto, monto_bruto, gasto_envio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [fecha, parseInt(monto_neto), parseInt(id_usuario), parseInt(impuesto), parseInt(monto_bruto), parseInt(gasto_envio)]
      );

      const promises = [];
      // Insertar los productos comprados en la tabla "detalle_compra"
      for (const e of productos) {
           promises.push(client.query(
          'INSERT INTO detalle_compra (id_compra, id_pdto, cantidad) VALUES ($1, $2, $3) RETURNING id',
          [parseInt(compraInsertada.rows[0].id), parseInt(e.id), parseInt(e.cantidad)]
        ));
  
        // Actualizar la cantidad de productos en la tabla "producto"
        promises.push(client.query('UPDATE producto SET existencia = existencia - $1 WHERE id = $2', [parseInt(e.cantidad), parseInt(e.id)]
        ));
      }
  
      await Promise.all(promises);
      await client.query('COMMIT');
      res.json({ compraId: compraInsertada.rows[0].id, mensaje: "Compra realizada con éxito" });
      
      return compraInsertada.rows[0].id;
    } catch (error) {
      await client.query('ROLLBACK');
      console.log('Compra cancelada');
      throw error;
    } finally {
      client.release();
    }
  };
  
