import { User } from '@prisma/client';
import { prisma } from '../../../libs/prisma';

const login = async (payload) => {
  //
};
const register = async (payload: User): Promise<User> => {
  const newUser = await prisma.user.create({
    data: payload,
  });
  return newUser;
};
const logout = async (payload) => {
  //
};

export const AuthServices = { login, register, logout };
