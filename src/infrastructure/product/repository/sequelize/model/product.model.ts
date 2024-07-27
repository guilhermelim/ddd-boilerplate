import { PrimaryKey, Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
export default class ProductModel extends Model {
  @Column({ allowNull: false })
  declare price: number;

  @Column({ allowNull: false })
  declare name: string;

  @PrimaryKey
  @Column
  declare id: string;
}
