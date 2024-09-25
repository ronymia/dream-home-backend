import { User } from '@prisma/client';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { UserServices } from './user.service';
import { Request, Response } from 'express';

// create agent
const createAgent = catchAsync(async (req: Request, res: Response) => {
  const { agent, profile, ...user } = req.body;
  const result = await UserServices.createAgent(user, profile, agent);

  // SEND RESPONSE
  sendResponse<User>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Agent created successfully',
    data: result,
  });
});

// get all
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();

  // SEND RESPONSE
  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

// get by id
const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUserById(Number(id));

  // SEND RESPONSE
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

//Update
const updateUser = catchAsync(async (req, res) => {
  const { ...userData } = req.body;
  const { id, ...user } = userData;

  const result = await UserServices.updateUser(Number(id), user);

  // SEND RESPONSE
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated successfully',
    data: result,
  });
});

// delete
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(Number(id));

  // SEND RESPONSE
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createAgent,
};
