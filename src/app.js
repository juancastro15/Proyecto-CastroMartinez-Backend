const express = require('express');
const productRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const path = require('path');
const { createServer } = require('http');
const { engine } = require('express-handlebars');
const { setupSocket } = require('./public/socket'); // Importar el archivo socket.js

const app = express();
const PORT = 8080;

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de que la carpeta views exista

// Middleware para leer JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar formularios
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta para archivos estáticos

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Crear servidor HTTP
const httpServer = createServer(app);
setupSocket(httpServer); // Configurar Socket.IO con el servidor HTTP

// Iniciar servidor
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
