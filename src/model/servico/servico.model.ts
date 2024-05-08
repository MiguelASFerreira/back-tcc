import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'servico',
})
export class Servico extends Model<Servico> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  rota_inicio: string;

  @Column({ type: DataType.STRING, allowNull: false })
  rota_fim: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;
}
