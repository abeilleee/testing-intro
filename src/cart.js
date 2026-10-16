function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

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

function removeFromCart() {
  return notImplemented();
}
function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
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
