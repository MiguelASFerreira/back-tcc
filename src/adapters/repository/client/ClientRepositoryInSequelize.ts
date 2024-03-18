import ClientRepository from 'domain/entity/client/ClientRepository';
import { Sequelize } from 'sequelize-typescript';

export default class ClientRepositoryInSequelize implements ClientRepository {
  constructor(private readonly sequelize: Sequelize) {}
}
