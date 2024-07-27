import { PrimaryKey, ForeignKey, BelongsTo, Column, Table, Model } from 'sequelize-typescript';

import ProductModel from '../../../../product/repository/sequelize/model/product.model';
import OrderModel from './order.model';

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @BelongsTo(() => OrderModel)
  declare order: ProductModel;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare price: number;

  @Column({ allowNull: false })
  declare name: string;

  @PrimaryKey
  @Column
  declare id: string;
}
