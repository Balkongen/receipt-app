import * as userService from "../service/userService";
import * as receiptTemplateRepository from "../repositories/receiptTemplateRepository";
import { IReceiptTemplate, ReceiptTemplate } from "../models/ReceiptTemplate";
import { ObjectId, Types } from "mongoose";

export const getReceiptTemplatesByUserAuthId = async (userAuthId: string) => {
  try {
    const user = await userService.getUserByAuthId(userAuthId);

    if (!user) {
      throw new Error(`Error: No user found for the auth_id`); // No user found
    }

    const res = await receiptTemplateRepository.getReceiptTemplatesByUserId(
      user.id
    );
    return res;
  } catch (error) {
    throw new Error(`Error fetching receiptTemplates: ${error}`);
  }
};

export const createReceiptTemplate = async (
  receiptTemplate: IReceiptTemplate,
  userAuthId: string
) => {
  try {
    const user = await userService.getUserByAuthId(userAuthId);

    if (!user) {
      throw new Error(`Error: No user found for the auth_id`);
    }
    receiptTemplate.user = user.id; // Set reference as it is null when passed to service layer

    const newReceiptTemplate =
      await receiptTemplateRepository.createRecieptTemplate(receiptTemplate);

    if (newReceiptTemplate) {
      await userService.setReceiptTemplate(newReceiptTemplate.id, userAuthId);
      return newReceiptTemplate;
    }

  } catch (error) {
    throw new Error(`Error creating receiptTemplate: ${error}`);
  }
};

export const deleteReceiptTemplate = async (
  receiptTemplateId: Types.ObjectId,
  userAuthId: string
) => {
  try {
    const user = await userService.getUserByAuthId(userAuthId);

    if (!user) {
      throw new Error(`Error: No user found for the auth_id`);
    }

    const userReceipts = user.receipt_templates;

    // Check if the user has the receipt template
    const receiptTemplateExists = userReceipts.some((receiptTemplate) =>
      receiptTemplate.equals(receiptTemplateId)
    );

    if (!receiptTemplateExists) {
      throw new Error(`Error: Receipt template does not belong to the user`);
    }

    // Proceed with deletion if the receipt template exists
    const deletedReceiptTemplate =
      await receiptTemplateRepository.deleteReceiptTemplate(receiptTemplateId);

    if (deletedReceiptTemplate) {
      await userService.deleteReceiptFromUser(receiptTemplateId, userAuthId);
    }

    return deletedReceiptTemplate;
  } catch (error) {
    throw new Error(`Error deleting receiptTemplate: ${error}`);
  }
};

/**
 * Deletas all receiptTemplates belonging to a single user
 * @param userId 
 * @returns 
 */
export const deleteAllReceiptTemplates = async (userId: Types.ObjectId) => {
  try {
    return await receiptTemplateRepository.deleteAllReceiptTemplates(userId);
  } catch (error) {
    throw new Error(`Error deleting receiptTemplates ${error}`);
  }
} 

export const getReceiptTemplateById = async (id: Types.ObjectId) => {
  try {
    return await receiptTemplateRepository.getReceiptTemplateById(id);
  } catch (error) {
    throw new Error(`Error fetching receiptTemplate ${error}`);
  }
}
