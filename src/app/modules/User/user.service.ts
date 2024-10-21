/* eslint-disable no-useless-catch */
import { User } from '@prisma/client';
import { prisma } from '../../../libs/prisma';

// create agent
const createAgent = (user, profile, agent) => {
  const transaction = prisma.$transaction(async (tx) => {
    try {
      // create user
      const newUser = await tx.user.create({
        data: {
          ...user,
          agent: {
            create: agent,
          },
          profile: {
            create: profile,
          },
        },
        include: {
          profile: true,
          agent: true,
        },
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  });

  console.log(transaction);

  return transaction;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

//
const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

//
const updateUser = async (id: number, user) => {
  const updatedUser = await prisma.profile.update({
    where: {
      id,
    },
    data: user,
  });
  return updatedUser;
};

//
const deleteUser = async (id: number) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });
  return deletedUser;
};

export const UserServices = {
  createAgent,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
