import { Request, Response } from "express";
import { IUser, User } from "../models/UserModel";
import * as userService from "../service/userService";

export const getUser = async (req: Request, res: Response) => {
  try {
    if (!res.locals.userEmail || !res.locals.userId) {
      console.log("Error getting email and userId");
      return res.status(400).send({ message: "Insufficient user data" });
    }

    const user = await userService.getUserByAuthId(res.locals.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send(user.company_info); // Change if want to return more info
  } catch (error) {
    console.log("Error fetching user: ", error);
    return res.status(500).send({ message: "Server error" });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    // Check if required data is available in res.locals
    if (!res.locals.userEmail || !res.locals.userId) {
      console.log("Error getting email and userId");
      return res.status(400).send({ message: "Insufficient user data" });
    }

    const newUser: IUser = {
      email: res.locals.userEmail,
      auth_id: res.locals.userId,
      has_access: true,
      company_info: {
        // TODO validate body
        name: req.body.companyName,
        org_number: req.body.orgNumber,
      },
      receipt_templates: [],
    };

    const createdUser = await userService.createUser(newUser);
    if (createdUser) {
      return res.status(201).send({ message: "Created user" });
    } else {
      console.log("Failed to create user");
      return res.status(500).send({ message: "Server error" });
    }
  } catch (error) {
    console.error("Error creating user: ", error);
    return res.status(500).send({ message: "Server error" });
  }
};
