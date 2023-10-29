const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware de express
app.use(express.json());

// Rutas
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');

app.use('/api/products', productsRouter);
app.use('/api/admin', adminRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
