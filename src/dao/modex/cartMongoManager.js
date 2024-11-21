import Cart from "../../models/cart.js";

export class CartMongoManager {
  // Crear un carrito
  async createCart() {
    const newCart = new Cart();
    return await newCart.save();
  }

  // Obtener carrito por ID
  async getCartById(id) {
    return await Cart.findById(id).populate("products.product");
  }

  // Agregar producto al carrito
  async addProductToCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return null;
    }
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex >= 0) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    await cart.save();
    return cart;
  }
}
