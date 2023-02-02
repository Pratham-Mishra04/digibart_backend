const depriciationRates = {
  Electronics: 0.4,
  Clothes: 0.0769,
  Kitchenware: 0.1277,
  Furniture: 0.1277,
  Books: 0.4,
  Stationary: 0.0769, //according to the catergories later listed
};

const calculateCost = (product) => {
  const multiplier = depriciationRates[product.category]
    ? depriciationRates[product.category]
    : 0.23904;
  return product.mrp * (1 - multiplier * product.age);
};

export default calculateCost;
