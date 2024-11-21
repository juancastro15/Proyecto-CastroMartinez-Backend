import { ProductMongoManager } from "../dao/modex/productMongoManager.js";

const productManager = new ProductMongoManager();

export const getAllProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const products = await productManager.getAll(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto" });
  }
};
