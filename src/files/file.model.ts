import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class FileModel extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;
}