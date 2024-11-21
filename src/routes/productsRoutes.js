import express from "express";
import {
  getAllProducts,
  addProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Obtener todos los productos (con límite opcional)
router.get("/", getAllProducts);

// Agregar un nuevo producto
router.post("/", addProduct);

export default router;
