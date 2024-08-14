import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post("/login", AuthControllers.login);
router.post("/register", AuthControllers.register);
router.post("/logout", AuthControllers.logout);


export const AuthRoutes = router;