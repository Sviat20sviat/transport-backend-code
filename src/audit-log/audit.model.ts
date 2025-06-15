import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';

@Table({ tableName: 'audit_logs', timestamps: true })
export class AuditLog extends Model<AuditLog> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING, comment: 'Тип операции: create, update, delete' })
  action: string;

  @Column({ allowNull: false, type: DataType.STRING, comment: 'Имя таблицы/модели' })
  tableName: string;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: 'ID затронутой записи' })
  recordId: number;

  @Column({ allowNull: true, type: DataType.JSONB, comment: 'Данные до операции' })
  beforeData: any;

  @Column({ allowNull: true, type: DataType.JSONB, comment: 'Данные после операции' })
  afterData: any;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: 'ID пользователя, выполнившего операцию' })
  userId: number;

  @Column({ allowNull: true, type: DataType.JSONB, comment: 'Данные пользователя' })
  userData: any;
}
