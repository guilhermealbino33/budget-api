// /* eslint-disable no-unneeded-ternary */
// import { inject, injectable } from 'tsyringe';
// import { IBudget } from '../../../entities/budget';
// import { AppError } from '../../../shared/errors/AppError';
// import { isValidId } from '../../../shared/utils/idValidator';
// import { IAdditionalItemsRepository } from '../../additionalItems/repositories/IAdditionalItemsRepository';
// import { IProductsRepository } from '../../products/repositories/IProductsRepository';
// import { IBudgetsRepository } from '../repositories/IBudgetsRepository';
// import { calculateTotalValue } from '../services/calculateTotalValue';

// @injectable()
// export default class UpdateBudgetUseCase {
//   constructor(
//     @inject('BudgetsRepository')
//     private budgetsRepository: IBudgetsRepository,
//     private productsRepository: IProductsRepository,
//     @inject('AdditionalItemsRepository')
//     private additionalItemsRepository: IAdditionalItemsRepository
//   ) {}

//   async execute(
//     id: string,
//     {
//       code,
//       customer_id,
//       products,
//       salesman_id,
//       delivery_type,
//       delivery_value,
//       observations,
//       additional_items,
//       closed,
//       total_value,
//       created_at,
//       updated_at,
//     }: IBudget
//   ) {
//     /**
//      * Aqui testar em relaçao ao update de produtos e items adicionais:
//      * Ao substituir um produto pelo outro:
//      * - budgetProductsRepository.updateByProductId()
//      *
//      * Ao deletar um produto:
//      * - budgetProductsRepository.deleteByProductId()
//      *
//      *
//      */

//     if (!isValidId(id)) {
//       throw new AppError('Invalid budget id!', 400);
//     }

//     const budgetToUpdate = await this.budgetsRepository.findById(id);

//     if (budgetToUpdate.closed) {
//       throw new AppError('Can not update a closed budget!', 400);
//     }

//     if (!budgetToUpdate) {
//       throw new AppError('Budget not found!', 404);
//     }

//     const products = await this.productsRepository.findByIds(products_id);

//     if (!products) {
//       throw new AppError('Budget must have at least one product!', 400);
//     } else {
//       budgetToUpdate.products = products;
//     }

//     const additionalItems = await this.additionalItemsRepository.findByIds(
//       additional_items_id
//     );

//     if (additionalItems) {
//       budgetToUpdate.additional_items = additionalItems;
//     }

//     budgetToUpdate.total_value = await calculateTotalValue(budgetToUpdate);

//     budgetToUpdate.code = code ? code : budgetToUpdate.code;
//     budgetToUpdate.customer_id = customer_id
//       ? customer_id
//       : budgetToUpdate.customer_id;
//     budgetToUpdate.products = products ? products : budgetToUpdate.products;
//     budgetToUpdate.salesman_id = salesman_id
//       ? salesman_id
//       : budgetToUpdate.salesman_id;
//     budgetToUpdate.quantity = quantity ? quantity : budgetToUpdate.quantity;
//     budgetToUpdate.delivery_type = delivery_type
//       ? delivery_type
//       : budgetToUpdate.delivery_type;
//     budgetToUpdate.delivery_value = delivery_value
//       ? delivery_value
//       : budgetToUpdate.delivery_value;
//     budgetToUpdate.observations = observations
//       ? observations
//       : budgetToUpdate.observations;
//     budgetToUpdate.additional_items = additionalItems
//       ? additionalItems
//       : budgetToUpdate.additional_items;

//     budgetToUpdate.updated_at = new Date();

//     return this.budgetsRepository.updateBudget(budgetToUpdate);
//   }
// }
