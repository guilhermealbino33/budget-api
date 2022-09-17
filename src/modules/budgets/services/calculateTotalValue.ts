import { IBudget } from '../../../entities/budget';
import { IBudgetProducts } from '../../../entities/budgetProducts';

export async function calculateTotalValue(budget: IBudget): Promise<number> {
  const sum = [];
  const productsValue = budget.products.map((product) =>
    calculateProductTotalPrice(product)
  );
  sum.push(...productsValue);

  if (budget.additional_items) {
    const additionalItemsValue = budget.additional_items.map(
      (additionalItem) => additionalItem.value
    );
    sum.push(...additionalItemsValue);
  }

  if (budget.delivery_value) {
    sum.push(budget.delivery_value);
  }

  return sum.reduce((partialSum, a) => partialSum + a, 0);
}

export function calculateProductTotalPrice(product: IBudgetProducts): number {
  return product.unit_price * product.quantity - product.discount;
}
