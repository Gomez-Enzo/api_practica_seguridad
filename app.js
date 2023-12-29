const express = require("express");
const app = express();
const {auth} = require("express-oauth2-jwt-bearer");
const productosRouter = require ("./routes/productos");
const errorHandler = require("./middleware/errorHandler");

const jwtCheck = auth({
    audience: 'http://localhost:3000/productos',
    issuerBaseURL: 'https://dev-izdedb5j2bozh2nq.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

//linea para validar todas las rutas
// app.use(jwtCheck);

app.get('/', (req, res) => {
    res.send("AI de productos");
});
app.use("/productos", jwtCheck , productosRouter);

app.use(errorHandler);

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Api de productos escuchando en el puerto ${port}`);
});