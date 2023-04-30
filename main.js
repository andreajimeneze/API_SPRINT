import express from "express";
import categoriaRouter from "../API/src/routes/categoriaRoutes.js";
import compraRouter from "../API/src/routes/compraRoutes.js";
import detalleRouter from "../API/src/routes/detalleRoutes.js";
import productoRouter from "../API/src/routes/productoRoutes.js";
import usuarioRouter from "../API/src/routes/usuarioRoutes.js";
import estadoRouter from "../API/src/routes/estadoRoutes.js";
import { PORT } from "../API/conect.js";
const app = express();


app.use(express.json());

app.use("/API/v1", categoriaRouter);
app.use("/API/v1", compraRouter);
app.use("/API/v1", detalleRouter);
app.use("/API/v1", productoRouter);
app.use("/API/v1", usuarioRouter);
app.use("/API/v1", estadoRouter);

app.use((req,res,next)=> {
  res.status(404).json({
      message: 'endpoint no encontrado'
  })
})

app.listen(PORT, () => {
    console.log(`En Puerto ${ PORT }`);
  })
