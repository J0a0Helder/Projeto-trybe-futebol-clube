import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import LoginMiddelware from '../middlewares/LoginMiddleware';

const matchesController = new MatchesController();
const loginMiddleware = new LoginMiddelware();

const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAll);
matchesRouter.patch('/:id/finish', loginMiddleware.loginToken, matchesController.finishById);
matchesRouter.patch('/:id', loginMiddleware.loginToken, matchesController.updateById);

export default matchesRouter;
