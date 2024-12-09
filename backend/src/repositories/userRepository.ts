import { ObjectId, Types } from "mongoose";
import { DatabaseError } from "../errors/DatabaseError";
import { authNewUser } from "../middleWare/authNewUser";
import { IReceiptTemplate } from "../models/ReceiptTemplate";
import { IUser, User } from "../models/UserModel";

export const createUser = async (user: IUser) => {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    throw new DatabaseError(`Error creating user ${error}`);
  }
};

export const isUserRegistered = async (id: string) => {
  try {
    const user = await User.findOne({ auth_id: id }).exec();
    if (user) {
      return true;
    }
  } catch (error) {
    console.log("Error fetching user: ", error);
  }
  return false;
};

export const getUserByAuthId = async (userAuthId: string) => {
  try {
    return await User.findOne({ auth_id: userAuthId }).exec();
  } catch (error) {
    throw new DatabaseError(`Error fetching user: ${error}`);
  }
};

export const setReceiptTemplateToUser = async (
  receiptTemplateId: Types.ObjectId,
  userAuthId: string
) => {
  try {
    const user = await getUserByAuthId(userAuthId);

    if (!user) {
      throw new DatabaseError("Error, user fetching user with userAuthId");
    }

    user.receipt_templates.push(receiptTemplateId);
    return await user.save();
  } catch (error) {
    throw new DatabaseError(`Error setting receiptTemplate ${error}`);
  }
};
/**
 * Removes all receipttemplates from the user and then removes them from the database
 * @param receiptTemplateId 
 * @param userAuthId 
 * @returns 
 */
export const deleteReceiptFromUser = async (
  receiptTemplateId: Types.ObjectId,
  userAuthId: string
) => {
  try {
    const user = await getUserByAuthId(userAuthId);

    if (!user) {
      throw new DatabaseError("Error, user fetching user with userAuthId");
    }
     // Remove the receipt template from the user's receipt_templates array
     user.receipt_templates = user.receipt_templates.filter(
      templateId => !templateId.equals(receiptTemplateId)
    );

    // Save the updated user document
    return await user.save();

  } catch (error) {
    throw new DatabaseError(`Error removing receiptTemplate ${error}`);
  }
};

export const deleteUser = async (userAuthId: string) => {
  try {
    return await User.deleteOne({auth_id: userAuthId}).exec();
  } catch (error) {
    throw new DatabaseError(`Error removing user: ${error}`);
  }
}