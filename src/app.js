const express = require('express');
const productRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 8080;

// Configurar Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de que la carpeta views exista

// Middleware para leer JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar formularios
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta para archivos estáticos

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Crear servidor HTTP y configurar Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer);

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Emitir la lista de productos al conectar
    productManager.getAllProducts().then(products => {
        socket.emit('updateProducts', products);
    });

    // Escuchar eventos de agregar productos
    socket.on('addProduct', async (data) => {
        await productManager.addProduct(data); // Método para agregar producto
        const updatedProducts = await productManager.getAllProducts();
        io.emit('updateProducts', updatedProducts); // Emitir a todos los clientes
    });

    // Puedes agregar un evento para eliminar productos aquí
});

// Iniciar servidor
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = { app, io };
