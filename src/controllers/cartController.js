import { CartMongoManager } from "../dao/modex/cartMongoManager.js";

const cartManager = new CartMongoManager();

export const createCart = async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res
        .status(404)
        .json({ error: "Carrito no encontrado o producto no válido" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};
