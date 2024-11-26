import { ProductMongoManager } from "../dao/modex/productMongoManager.js";

const productManager = new ProductMongoManager();

export const getAllProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const products = await productManager.getAll(limit);
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al obtener los productos",
        details: error.message,
      });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productManager.getById(req.params.pid);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el producto", details: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al agregar el producto", details: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(
      req.params.pid,
      req.body
    );
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al actualizar el producto",
        details: error.message,
      });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productManager.deleteProduct(req.params.pid);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el producto", details: error.message });
  }
};
