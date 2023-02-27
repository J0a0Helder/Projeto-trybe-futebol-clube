import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const teamsRouter = Router();

teamsRouter.get('/', teamsController.getAll);

export default teamsRouter;
