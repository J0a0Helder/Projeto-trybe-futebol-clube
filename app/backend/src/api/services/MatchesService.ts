import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamsModel';
import Matches from '../../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchesService implements IServiceMatches {
  protected model: ModelStatic<Matches> = Matches;

  async getAll(inProgress: string | undefined): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    const matchesInProgress = matches.filter((match) => match.inProgress.toString() === inProgress);

    if (inProgress) return matchesInProgress as unknown as IMatches[];

    return matches as unknown as IMatches[];
  }

  async finishById(id: number): Promise<{ message: string; }> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return { message: 'Finished' };
  }
}
