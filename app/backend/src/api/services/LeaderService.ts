import { QueryTypes } from 'sequelize';
import Model from '../../database/models';
import queryTest from './helpers/sqlQuery';
import IServiceLeaderB from '../interfaces/Iservices/IServiceLeaderB';
import ILeader from '../interfaces/ILeader/ILeader';

export default class LeaderService implements IServiceLeaderB {
  protected model = Model;

  async getHomePerformance(): Promise<ILeader[]> {
    return this.model.query(queryTest, { type: QueryTypes.SELECT });
  }
}
