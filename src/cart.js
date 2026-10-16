const PROMOCODE = "SAVE10";
const DELIVERY_COST = 30000;
const DISCOUNT_THRESHOLD = 20000;
const FREE_DELIVERY_THRESHOLD = 50000;

function assertQuantity(quantity, stock) {
  if (quantity <= 0)
    throw new RangeError("Количество товара должно быть больше нуля");

  if (quantity > stock) throw new RangeError("Недостаточно товара на складе");
}

function addToCart(cart, product, quantity) {
  assertQuantity(quantity, product.stock);

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem)
    return changeQuantity(
      cart,
      product.id,
      (existingItem.quantity ?? 0) + quantity,
    );

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, id, quantity) {
  const product = cart.find((item) => item.id === id);

  if (!product) return cart;

  assertQuantity(quantity, product.stock);

  return cart.map((item) => (item.id === id ? { ...item, quantity } : item));
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  if (cart.length === 0) return 0;

  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promocode) {
  const subtotal = calculateCartSubtotal(cart);
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_COST;
  let discount = 0;

  if (subtotal >= DISCOUNT_THRESHOLD) {
    discount = promocode === PROMOCODE ? subtotal * 0.1 : 0;
  }

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
