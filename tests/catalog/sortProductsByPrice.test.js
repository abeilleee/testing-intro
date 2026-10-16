const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

describe("sortProductsByPrice", () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(
      sortProductsByPrice(products, "asc").map((product) => product.id),
    ).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products).map((product) => product.id)).toEqual([
      3, 6, 5, 4, 2, 1,
    ]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const productsIds = [1, 3, 4];
    const targetProducts = products.filter((product) =>
      productsIds.includes(product.id),
    );

    expect(
      sortProductsByPrice(targetProducts, "asc").map((product) => product.id),
    ).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(
      sortProductsByPrice(products, "desc").map((product) => product.id),
    ).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const productsIds = [3, 1, 4];
    const targetProducts = products.filter((product) =>
      productsIds.includes(product.id),
    );

    expect(
      sortProductsByPrice(targetProducts, "desc").map((product) => product.id),
    ).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const productsIds = [5, 2, 6];
    const targetProducts = products.filter((product) =>
      productsIds.includes(product.id),
    );

    expect(
      sortProductsByPrice(targetProducts, "desc").map((product) => product.id),
    ).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const ids = [1, 3, 4];
    const targetProducts = products.filter(({ id }) => ids.includes(id));
    const copy = [...targetProducts];

    sortProductsByPrice(targetProducts, "asc");

    expect(targetProducts.map((product) => product.id)).toEqual(
      copy.map((product) => product.id),
    );
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const ids = [1, 3, 4];
    const targetProducts = products.filter(({ id }) => ids.includes(id));
    const copy = [...targetProducts];

    sortProductsByPrice(targetProducts, "desc");

    expect(targetProducts.map((product) => product.id)).toEqual(
      copy.map((product) => product.id),
    );
  });

  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    const copy = [...products];

    sortProductsByPrice(products);

    expect(products).toEqual(copy);
  });
});
