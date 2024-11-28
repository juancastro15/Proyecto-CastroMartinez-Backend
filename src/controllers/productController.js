import { ProductMongoManager } from "../dao/modex/productMongoManager.js";

const productManager = new ProductMongoManager();

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort = "asc", query } = req.query;

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort === "asc" ? { price: 1 } : { price: -1 },
      query: query ? JSON.parse(query) : {}, // query debe ser un objeto JSON
    };

    const products = await productManager.getAll(options);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const addsProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status,
    } = req.body;
    const existingProduct = await productManager.getAll({ query: { code } });

    if (existingProduct.payload.length > 0) {
      return res
        .status(400)
        .json({ error: "El código del producto ya existe" });
    }
    const productNew = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status,
    };
    const newProduct = await productManager.addProduct(productNew);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getById(pid);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await productManager.updateProduct(pid, req.body);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.deleteProduct(pid);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
