import { IAdditionalItem } from '../../../entities/additionalItem';
import { IProduct } from '../../../entities/product';

export async function calculateTotalValue(
  products: IProduct[],
  additionalItems?: IAdditionalItem[]
): Promise<number> {
  const sum = [];
  const productsValue = products.map((product) => product.value);
  sum.push(...productsValue);

  if (additionalItems) {
    const additionalItemsValue = additionalItems.map(
      (additionalItem) => additionalItem.value
    );
    sum.push(...additionalItemsValue);
  }

  return sum.reduce((partialSum, a) => partialSum + a, 0);
}
