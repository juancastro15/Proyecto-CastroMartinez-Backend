import { Router } from "express";
import { ProductMongoManager as ProductManager } from "../dao/modex/productMongoManager.js";
const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  const { limit, page, sort, query } = req.query.limit || 10;
  try {
    const Products = await productManager.getAll({ limit, page, sort, query });
    const cleanProducts = Products.payload.map((product) => ({
      _id: product._id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
      category: product.category,
      status: product.status,
      description: product.description,
    }));
    res.render("home", {
      title: "Home",
      products: Products && cleanProducts,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export default router;
