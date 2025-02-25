import express from 'express';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     description: Authenticate the user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/login', AuthControllers.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User data
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *             refreshToken:
 *               type: string
 *             user:
 *               $ref: '#/definitions/User'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', AuthControllers.register);

/**
 * @swagger
 * /auth/onAuthStateChange:
 *   get:
 *     summary: Get user data from JWT token
 *     description: Get user data from JWT token
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: User data
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/definitions/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/onAuthStateChange', auth(), AuthControllers.onAuthStateChange);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     description: Logout
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/logout', AuthControllers.logout);

export const AuthRoutes = router;
