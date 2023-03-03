import { Router } from 'express';
import LeaderController from '../controllers/LeaderController';

const leaderController = new LeaderController();

const leaderRouter = Router();

leaderRouter.get('/home', leaderController.getHomePerformance);

export default leaderRouter;
