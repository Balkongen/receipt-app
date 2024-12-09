import { IReceiptTemplate as mockUserService } from "../models/ReceiptTemplate";
import { IUser, User } from "../models/UserModel";
import * as userRepository from "../repositories/userRepository";
import * as receiptTemplateService from "../service/receiptTemplateService";
import { ObjectId, Types } from "mongoose";

export const createUser = async (user: IUser) => {
  if (!user) {
    throw new Error("User data is missing");
  }

  if (await userRepository.isUserRegistered(user.auth_id)) {
    throw new Error("User with the same auth_id existing in database");
  }

  try {
    return userRepository.createUser(user);
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

export const deleteUser = async (userAuthId: string) => {
  try {
    const user = await userRepository.getUserByAuthId(userAuthId);

    if (user) {
      // Delete all receiptTemplates that belongs to the user

      await receiptTemplateService.deleteAllReceiptTemplates(user.id);
      await userRepository.deleteUser(userAuthId);
      return user;
    }
    throw new Error("User does not exist in database");
  } catch (error) {
    throw new Error(`Error deleting user ${error}`);
  }
};

export const getUserByAuthId = async (userAuthId: string) => {
  try {
    const user = await userRepository.getUserByAuthId(userAuthId);
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  }
};

export const setReceiptTemplate = async (
  receiptTemplateId: Types.ObjectId,
  userAuthId: string
) => {
  try {
    return await userRepository.setReceiptTemplateToUser(
      receiptTemplateId,
      userAuthId
    );
  } catch (error) {
    throw new Error(`Error setting receiptTemplate to user ${error}`);
  }
};

export const deleteReceiptFromUser = async (
  receiptTemplateId: Types.ObjectId,
  userAuthId: string
) => {
  try {
    return await userRepository.deleteReceiptFromUser(
      receiptTemplateId,
      userAuthId
    );
  } catch (error) {
    throw new Error(`Error removing receiptTemplate from user ${error}`);
  }
};

export const isUserRegistered = async (userAuthId: string) => {
  try {
    return await userRepository.isUserRegistered(userAuthId);
  } catch (error) {
    throw new Error(`Error checking user ${error}`);
  }
};
