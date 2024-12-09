import { DatabaseError } from "../errors/DatabaseError";
import { ReceiptTemplate, IReceiptTemplate } from "../models/ReceiptTemplate";
import * as userService from "../service/userService";

import { ObjectId, Types } from "mongoose";

export const getReceiptTemplatesByUserId = async (userId: string) => {
  try {
    return await ReceiptTemplate.find({ user: userId }).exec();
  } catch (error) {
    throw new DatabaseError(`Error fetching receiptTemplates: ${error}`);
  }
};

export const createRecieptTemplate = async (
  receiptTemplate: IReceiptTemplate
) => {
  try {
    const newReceiptTemplate = new ReceiptTemplate(receiptTemplate);
    return await newReceiptTemplate.save();
  } catch (error) {
    throw new DatabaseError(`Error creating receiptTemplate ${error}`);
  }
};

export const deleteReceiptTemplate = async (id: Types.ObjectId) => {
  try {
    return await ReceiptTemplate.findByIdAndDelete(id).exec();
  } catch (error) {
    throw new DatabaseError(`Error deleting receiptTemplate ${error}`);
  }
};

export const deleteAllReceiptTemplates = async (userId: Types.ObjectId) => {
  try {
    return await ReceiptTemplate.deleteMany({ user: userId }).exec();
  } catch (error) {
    throw new DatabaseError(`Error deleting receiptTemplates ${error}`);
  }
};

export const getReceiptTemplateById = async (id: Types.ObjectId) => {
  try {
    return await ReceiptTemplate.findById(id).exec();
  } catch (error) {
    throw new DatabaseError(`Error fetching receiptTemplate ${error}`);
  }
};
