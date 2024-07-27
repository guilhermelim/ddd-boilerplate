import ProductRepositoryInterface from '../../../../domain/product/repository/product-repository-interface';
import Product from '../../../../domain/product/entity/product';
import ProductModel from './model/product.model';

export default class ProductRepository implements ProductRepositoryInterface {
  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        price: entity.price,
        name: entity.name,
      },
      {
        where: {
          id: entity.id,
        },
      },
    );
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map((productModel) => new Product(productModel.id, productModel.name, productModel.price));
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });
    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      price: entity.price,
      name: entity.name,
      id: entity.id,
    });
  }
}
