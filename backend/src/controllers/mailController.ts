import { Request, Response } from "express";
import * as mailService from "../service/mailService";
import { IReceiptUser } from "../interfaces/IReceiptUser";
import { Types } from "mongoose";

export const sendMailToUser = async (req: Request, res: Response) => {
  try {
    if (!res.locals.userEmail || !res.locals.userId) {
      console.log("Error getting email and userId");
      return res.status(400).send({ message: "Insufficient user data" });
    }
    // TODO implement validation
    const receiptUser: IReceiptUser = {
      email: req.body.email,
      name: req.body.name,
      personNumber: req.body.personNumber,
    };

    const receiptTemplateId = new Types.ObjectId(req.params.id);

    await mailService.sendEmail(receiptUser, res.locals.userId, receiptTemplateId);

    return res.status(201).send({message: "Email sent"});

  } catch (error) {
    console.log("Error sending mail: ", error);
    return res.status(500).send({ message: "Server error" });
  }
};
