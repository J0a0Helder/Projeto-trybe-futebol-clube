import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.getAll();
    res.status(200).json(teams);
  };
}
