import { Request, Response } from 'express';
import LeaderService from '../services/LeaderService';

export default class LeaderController {
  constructor(private leaderService = new LeaderService()) {}

  public getHomePerformance = async (_req: Request, res: Response) => {
    const homeTeamsP = await this.leaderService.getHomePerformance();
    res.status(200).json(homeTeamsP);
  };
}
