import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/', UserControllers.getAllUsers);

router.post('/create-agent', UserControllers.createAgent);

router.get('/:id', UserControllers.getUserById);

router.patch('/:id', UserControllers.updateUser);

router.delete('/:id', UserControllers.deleteUser);

export const UserRoutes = router;
