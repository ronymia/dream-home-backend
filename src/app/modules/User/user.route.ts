import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/', UserControllers.getAllUsers);

router.post('/agent/:id', UserControllers.createAgent);

router.get('/:id', UserControllers.getUserById);

router.patch('/:id', UserControllers.updateUser);

router.delete('/:id', UserControllers.deleteUser);

export const UserRoutes = router;
