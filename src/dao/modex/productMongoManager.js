import mongoose from "mongoose";
import Product from "../models/ProductModel.js"; // Supongamos que tienes este modelo definido

export class ProductMongoManager {
  // Obtener productos con filtros, paginación y orden
  async getAll({ limit, page, sort, query }) {
    const options = {
      limit,
      page,
      sort,
    };
    return await Product.paginate(query, options); // Usamos mongoose-paginate-v2 para este ejemplo
  }

  async getById(id) {
    return await Product.findById(id);
  }

  async addProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(id, updates) {
    return await Product.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}
