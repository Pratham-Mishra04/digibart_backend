const depriciationRates = {
  Electronics: 0.4,
  Clothes: 0.0769,
  Kitchenware: 0.1277,
  Furniture: 0.1277,
  Books: 0.4,
  Stationary: 0.0769, //according to the catergories later listed
};

const calculateCost = (product) => {
  if (
    product.tags.includes(/phone/i) ||
    product.tags.includes(/tv/i) ||
    product.tags.includes(/electronics/i) ||
    product.category.match(/electronics/i)
  ) {
    product.category = 'Electronics';
  }
  if (
    product.tags.includes(/pen/i) ||
    product.tags.includes(/pencil/i) ||
    product.tags.includes(/eraser/i) ||
    product.category.match(/stationary/i)
  ) {
    product.category = 'Stationary';
  }
  const multiplier = depriciationRates[product.category]
    ? depriciationRates[product.category]
    : 0.23904;
  return product.mrp * (1 - multiplier * product.age);
};

export default calculateCost;
