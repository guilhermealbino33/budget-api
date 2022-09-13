import { IBudget } from '../../../entities/budget';

export async function calculateTotalValue(budget: IBudget): Promise<number> {
  const sum = [];
  const productsValue = budget.products.map((product) => product.value);
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
