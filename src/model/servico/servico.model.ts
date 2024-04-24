import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'servico',
  timestamps: true,
})
export class Servico extends Model<Servico> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.NUMBER,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  rota_inicio: string;

  @Column({ type: DataType.STRING, allowNull: false })
  rota_fim: string;
}
