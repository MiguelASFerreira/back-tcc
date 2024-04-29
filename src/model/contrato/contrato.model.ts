import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'contrato',
  timestamps: true,
})
export class Contrato extends Model
{
@Column({
primaryKey: true,
autoIncrement: true,
type: DataType.NUMBER,
})
id: number;

@Column({ type: DataType.NUMBER, allowNull: false })
id_servico: number;

@Column({ type: DataType.NUMBER, allowNull: false })
id_cliente: number;

@Column({ type: DataType.NUMBER, allowNull: false })
id_empresa: number;

@Column({ type: DataType.DECIMAL(10, 2), allowNull: true }) 
vl_desconto: number;

@Column({ type: DataType.DATE, allowNull: false })
dt_contrato: Date;

@Column({ type: DataType.DATE, allowNull: false })
dt_inicio: Date;

@Column({ type: DataType.DATE, allowNull: false })
dt_fim: Date;
}