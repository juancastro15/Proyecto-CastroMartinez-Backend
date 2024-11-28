import mongoose from "mongoose";
import Product from "../../models/products.js"; // Supongamos que tienes este modelo definido

export class ProductMongoManager {
  // Obtener productos con filtros, paginación y orden
  async getAll({ limit, page, sort, query }) {
    const options = {
      limit,
      page,
      sort,
    };

    let Products = await Product.paginate(query, options);
    Products = {
      status: Products.docs.length > 0 ? "success" : "error",
      payload: Products.docs,
      totalPages: Products.totalPages,
      prevPage: Products.prevPage,
      nextPage: Products.nextPage,
      page: Products.page,
      hasPrevPage: Products.hasPrevPage,
      hasNextPage: Products.hasNextPage,
      prevLink: Products.hasPrevPage
        ? `http://localhost:8080/products?limit=${limit}&page=${Products.prevPage}`
        : null,
      nextLink: Products.hasNextPage
        ? `http://localhost:8080/products?limit=${limit}&page=${Products.nextPage}`
        : null,
    };
    return Products;
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
