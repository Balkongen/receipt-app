import { IReceiptUser } from "../interfaces/IReceiptUser";
import * as mailHandler from "../mailHandler/mail";
import * as pdfService from "./pdfService";
import { Types } from "mongoose";
import * as receiptTemplateService from "./receiptTemplateService";
import * as userService from "./userService";
import { IReceiptInfo } from "../pdf/interface/IReceiptInfo";

export const sendEmail = async (
  receiptUser: IReceiptUser,
  userAuthId: string,
  receiptTemplateId: Types.ObjectId
) => {
  try {
    const receiptTemplate = await receiptTemplateService.getReceiptTemplateById(
      receiptTemplateId
    );

    if (!receiptTemplate)
      throw new Error(`Error: No receiptTemplate found for the id`);

    const user = await userService.getUserByAuthId(userAuthId);

    if (!user) {
      throw new Error(`Error: No user found for the auth_id`);
    }

    const receiptInfo: IReceiptInfo = {
      item: receiptTemplate.item,
      moms: receiptTemplate.moms,
      totalCost: receiptTemplate.total_price,
      personName: receiptUser.name,
      personNumber: receiptUser.personNumber,
      companyName: user.company_info.name,
      companyOrgNumber: user.company_info.org_number,
    };

    const pdfBytes = await pdfService.createPDf(receiptInfo);

    const body = buildEmailBody();

    await mailHandler.sendEmail(body, "Kvitto", pdfBytes, receiptUser.email);
  
  } catch (error) {
    console.log(error);
  }
};

const buildEmailBody = () => {
  return `<h1>Hej</h1>\n<p>Här är ditt friskvårdsvkitto</p>`;
};
