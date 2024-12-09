import { Request, Response } from "express";
import { IReceiptTemplate } from "../models/ReceiptTemplate";
import { DUMMY_OBJECT_ID } from "../utils/constants";
import { Types } from "mongoose";

import * as receiptTemplateService from "../service/receiptTemplateService";

export const createReceiptTemplate = async (req: Request, res: Response) => {
  try {
    if (!res.locals.userEmail || !res.locals.userId) {
      console.log("Error getting email and userId");
      return res.status(400).send({ message: "Insufficient user data" });
    }
    // TODO Implement validation

    const newReceiptTemplate: IReceiptTemplate = {
      item: req.body.item,
      moms: req.body.moms,
      total_price: req.body.total_price,
      user: DUMMY_OBJECT_ID,
    };

    const createdReceiptTemplate =
      await receiptTemplateService.createReceiptTemplate(
        newReceiptTemplate,
        res.locals.userId
      );

    if (createdReceiptTemplate) {
      return res.status(201).send({ message: "Created userTemplate" });
    } else {
      console.log("Failed to create receiptTemplate");
      return res.status(500).send({ message: "Server error" });
    }
  } catch (error) {
    console.log("Error creating receiptTemplate: ", error);
    return res.status(500).send({ message: "Server error" });
  }
};

export const getReceiptTemplatesByUserAuthId = async (
  req: Request,
  res: Response
) => {
  try {
    if (!res.locals.userEmail || !res.locals.userId) {
      console.log("Error getting email and userId");
      return res.status(400).send({ message: "Insufficient user data" });
    }

    const receiptTemplates =
      await receiptTemplateService.getReceiptTemplatesByUserAuthId(
        res.locals.userId
      );

    return res.status(200).send({ receiptTemplates: receiptTemplates });
  } catch (error) {
    console.log("Error fetching receiptTemplates: ", error);
    return res.status(500).send({ message: "Server error" });
  }
};

export const deleteReceiptTemplate = async (req: Request, res: Response) => {
  try {
    if (!res.locals.userEmail || !res.locals.userId) {
      console.log("Error: Missing email or userId in request locals");
      return res.status(400).send({ message: "Insufficient user data" });
    }
    
    const receiptTemplateId = new Types.ObjectId(req.params.id);

    const response = await receiptTemplateService.deleteReceiptTemplate(
      receiptTemplateId,
      res.locals.userId
    );

    if (response) {
      console.log(
        `Successfully deleted receipt template with ID ${receiptTemplateId}`
      );
      return res
        .status(200)
        .send({ message: "Receipt template deleted successfully" });
    
    } else {
      console.log(`Receipt template with ID ${receiptTemplateId} not found`);
      return res.status(404).send({ message: "Receipt template not found" });
    }
  } catch (error) {
    console.log("Error deleting receipt template: ", error);
    return res.status(500).send({ message: "Server error" });
  }
};
