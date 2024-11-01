const { Server } = require('socket.io');

let io; // Variable para guardar la instancia de Socket.IO

const setupSocket = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        // Emitir la lista de productos al conectar
        socket.on('getProducts', async () => {
            const products = await productManager.getAllProducts(); // Asegúrate de tener acceso al ProductManager aquí
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
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io no está inicializado');
    }
    return io;
};

module.exports = { setupSocket, getIO };
