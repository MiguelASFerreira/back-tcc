import { Table, Column, Model, DataType, Sequelize, ForeignKey } from 'sequelize-typescript';
import { Empresa } from '../empresa/empresa.model'; // Assumindo que você tem um modelo Empresa já definido

@Table({
  tableName: 'veiculo'
})
export class Veiculo extends Model<Veiculo> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  nome: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    unique: true
  })
  placa: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  capacidade: number;

  @ForeignKey(() => Empresa)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  empresa_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  adaptavel: boolean;

  @Column({ 
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at'
  })
  createdAt: Date;

  @Column({ 
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    field: 'updated_at'
  })
  updatedAt: Date;
}
