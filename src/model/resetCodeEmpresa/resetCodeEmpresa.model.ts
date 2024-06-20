import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Sequelize,
    Table,
  } from 'sequelize-typescript';
import { Empresa } from '../empresa/empresa.model';
  
  @Table({
    tableName: 'reset_code_empresa',
  })
  export class ResetCodeEmpresa extends Model<ResetCodeEmpresa> {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER,
    })
    id: number;
  
    @Column({
      type: DataType.DOUBLE,
      allowNull: false,
      unique: true,
    })
    code: number;
  
    @ForeignKey(() => Empresa)
    @Column({ type: DataType.INTEGER, allowNull: false })
    id_empresa: number;
  
    @BelongsTo(() => Empresa)
    empresa: Empresa;
  
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
  