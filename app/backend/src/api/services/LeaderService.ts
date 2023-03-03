import { QueryTypes } from 'sequelize';
import Model from '../../database/models';
import { queryHome, queryAway } from './helpers/sqlQuery';
import IServiceLeaderB from '../interfaces/Iservices/IServiceLeaderB';
import ILeader from '../interfaces/ILeader/ILeader';

export default class LeaderService implements IServiceLeaderB {
  protected model = Model;

  async getHomePerformance(): Promise<ILeader[]> {
    return this.model.query(queryHome, { type: QueryTypes.SELECT });
  }

  async getAwayPerformance(): Promise<ILeader[]> {
    return this.model.query(queryAway, { type: QueryTypes.SELECT });
  }
}
