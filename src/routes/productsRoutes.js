import express from "express";
import {
  getAllProducts,
  addsProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Obtener todos los productos (con límite opcional)
router.get("/", getAllProducts);

// Agregar un nuevo producto
router.post("/", addsProduct);

router.delete("/:pid", deleteProduct);

export default router;
