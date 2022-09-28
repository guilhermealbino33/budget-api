import { Budget } from '../../../entities/budget';

export async function calculateTotalValue(budget: Budget): Promise<number> {
  const sum = [];
  const productsValue = budget.products.map((product) => product.total_price);

  sum.push(...productsValue);

  if (budget.additional_items) {
    const additionalItemsValue = budget.additional_items.map(
      (additional_item) => additional_item.total_price
    );
    sum.push(...additionalItemsValue);
  }

  if (budget.delivery_value) {
    sum.push(Number(budget.delivery_value));
  }

  return sum.reduce((partialSum, a) => partialSum + a, 0);
}

export function calculateProductTotalPrice(
  unit_price: number,
  quantity: number,
  discount = 0
): number {
  return unit_price * quantity - discount;
}
