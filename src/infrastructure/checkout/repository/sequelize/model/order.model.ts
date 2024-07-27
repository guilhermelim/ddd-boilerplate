import { PrimaryKey, ForeignKey, BelongsTo, HasMany, Column, Table, Model } from 'sequelize-typescript';

import CustomerModel from '../../../../customer/repository/sequelize/model/customer.model';
import OrderItemModel from './order-item.model';

@Table({
  tableName: 'orders',
  timestamps: false,
})
export default class OrderModel extends Model {
  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;

  @PrimaryKey
  @Column
  declare id: string;
}
