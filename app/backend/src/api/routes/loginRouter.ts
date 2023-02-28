import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginMiddelware from '../middlewares/LoginMiddleware';

const loginController = new LoginController();
const loginMiddleware = new LoginMiddelware();

const loginRouter = Router();

loginRouter.post('/', loginMiddleware.loginUserFields, loginController.loginUser);

export default loginRouter;
