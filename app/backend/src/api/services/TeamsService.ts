import { ModelStatic } from 'sequelize';
import IServiceTeams from '../interfaces/IServiceTeams';
import Teams from '../../database/models/TeamsModel';

export default class TeamsService implements IServiceTeams {
  protected model: ModelStatic<Teams> = Teams;

  async getAll(): Promise<Teams[]> {
    return this.model.findAll();
  }

  async getById(id: number): Promise<Teams | null> {
    return this.model.findByPk(id);
  }
}
