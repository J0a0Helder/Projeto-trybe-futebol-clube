import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getAll(inProgress as string);
    res.status(200).json(matches);
  };

  public finishById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = await this.matchesService.finishById(Number(id));
    res.status(200).json(match);
  };
}
