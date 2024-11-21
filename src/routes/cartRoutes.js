import express from "express";
import { createCart, addProductToCart } from "../controllers/cartController.js";

const router = express.Router();

// Crear un carrito nuevo
router.post("/", createCart);

// Agregar un producto a un carrito específico
router.post("/:cid/products/:pid", addProductToCart);

export default router;
