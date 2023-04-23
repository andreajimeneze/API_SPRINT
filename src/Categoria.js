import express from "express";
import pool from "../conect.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



// RUTA PARA CATEGORÍA
router.get("/categoria", async (req, res) => {
    const resultado = await pool.query('SELECT * FROM categoria ORDER BY id');
  
    res.json(resultado.rows);
});

router.post("/categoria", async (req, res) => {
    const { categoria } = req.body;
    const resultado = await pool.query('INSERT INTO categoria (categoria) VALUES ($1) RETURNING id', [ categoria ]);
    console.log(resultado)
    res.json({});
});

router.delete("/categoria/:id", async (req, res) => {
    try{
        const {id} =  req.params
        const resultado = await pool.query("delete from categoria where id=$1 RETURNING id",[id]);
        if(resultado.rows){
             res.status(200).json({id:resultado.rows[0].id})
        }else{
            res.status(404).json({error:"Registro no Existe"})
        }   
    }catch(e){
        res.status(500).json({error:e})
    }
});

router.put("/categoria/:id", async (req, res) => {
    const { categoria } = req.body;
    const resultado =  await pool.query("UPDATE categoria set categoria =$1 WHERE id=$2",[categoria, id]);
    console.log(resultado),
    res.json({})
});

export default router;