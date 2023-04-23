import express from "express";
import categoriaRouter from "../API/src/Categoria.js";
import compraRouter from "../API/src/Compra.js";
import detalleRouter from "../API/src/DetalleCompra.js";
import productoRouter from "../API/src/Producto.js";
import usuarioRouter from "../API/src/Usuario.js";
const app = express();


app.use(express.json());

app.use("/API/v1", categoriaRouter);
app.use("/API/v1", compraRouter);
app.use("/API/v1", detalleRouter);
app.use("/API/v1", productoRouter);
app.use("/API/v1", usuarioRouter);

app.use((req,res,next)=> {
  res.status(404).json({
      message: 'endpoint no encontrado'
  })
})

app.listen(4000, () => {
    console.log("En Puerto 4000");
  })
