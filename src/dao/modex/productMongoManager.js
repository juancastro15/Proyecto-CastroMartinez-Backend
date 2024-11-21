import Product from "../../models/product.js";

export class ProductMongoManager {
  // Obtener todos los productos
  async getAll(limit) {
    return await Product.find().limit(limit);
  }

  // Obtener un producto por su ID
  async getById(id) {
    return await Product.findById(id);
  }

  // Crear un nuevo producto
  async addProduct(productData) {
    const newProduct = new Product(productData);
    return await newProduct.save();
  }

  // Actualizar un producto
  async updateProduct(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  // Eliminar un producto
  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}
