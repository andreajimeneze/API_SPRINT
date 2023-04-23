import express from "express";
import pool from "../../conect.js";
import CryptoJS from "crypto-js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


export const getUsuarios = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT usuario, password FROM registrousuario');
        res.json(resultado.rows);
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

export const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT usuario, password FROM registrousuario WHERE id =$1', [id]);
        if (resultado.rows.length === 1) {
            res.json(resultado.rows);
        } else {
            res.status(404).json({
                message: "Usuario no existe"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        })
    }
};

export const setUsuario = async (req, res) => {
    try {
        const { rut, usuario } = req.body;
        const resultado = await pool.query('SELECT rut, usuario FROM registrousuario WHERE rut = $1 OR usuario = $2', [rut, usuario]);
        console.log(resultado.rows)

        if (resultado.rows.length === 0) {
                const { rut, usuario, nombres, apellidos, direccion, telefono, email, password } = req.body;
                const hashedPassword = CryptoJS.SHA256(password).toString();
                const queryResult = await pool.query(`INSERT INTO registrousuario (nombres, apellidos, rut, direccion, telefono, email, usuario, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [nombres, apellidos, rut, direccion, telefono, email, usuario, hashedPassword]);

                console.log(queryResult.rows);
                res.json({});
        } else {
            res.status(409).json({
                message: "Usuario ya existe"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal. Intente más tarde"
        });
    }
};




