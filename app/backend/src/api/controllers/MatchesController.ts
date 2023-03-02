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

  public updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const data = { id: Number(id), homeTeamGoals, awayTeamGoals };
    const updateMatche = await this.matchesService.updateById(data);
    res.status(200).json(updateMatche);
  };

  public insertNew = async (req: Request, res: Response) => {
    const newMatch = await this.matchesService.insertNew(req.body);
    if (newMatch.status) {
      return res.status(newMatch.status).json({ message: newMatch.message });
    }
    res.status(201).json(newMatch);
  };
}
