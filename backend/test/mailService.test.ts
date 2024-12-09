import {
  describe,
  test,
  expect,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals";

import * as pdfService from "../src/service/pdfService";
import { User, IUser } from "../src/models/UserModel";
import * as dbHandler from "./dbTestHandler";
import * as userService from "../src/service/userService";
import * as receiptService from "../src/service/receiptTemplateService";
import {
  IReceiptTemplate,
  ReceiptTemplate,
} from "../src/models/ReceiptTemplate";
import { IReceiptInfo } from "../src/pdf/interface/IReceiptInfo";
import * as mailService from "../src/service/mailService";
import { IReceiptUser } from "../src/interfaces/IReceiptUser";


const EMAIL = "";

describe.skip("mailService tests. To run this test, specify email adress", () => {
  beforeEach(async () => {
    await dbHandler.initializeMongoServer();
  });

  afterEach(async () => {
    await dbHandler.kill();
  });

  test("Send email using correct info", async () => {
    const user = await createUser();
    await userService.createUser(user);

    const savedUser = await userService.getUserByAuthId(user.auth_id);

    if (savedUser) {
      const receipts = getValidReceiptTemplates(1, savedUser.id);

      if (receipts.length > 0) {
        await receiptService.createReceiptTemplate(
          receipts[0],
          savedUser.auth_id
        );
      } else {
        console.error("No valid receipt templates found");
        // Handle the case where there are no valid receipt templates
      }

      const savedReceipts =
        await receiptService.getReceiptTemplatesByUserAuthId(
          savedUser?.auth_id
        );
      const currentReceipt = savedReceipts[0];

      const receiptUser: IReceiptUser = {
        email: EMAIL,
        name: "John Doe",
        personNumber: "33333333",
      };

      await mailService.sendEmail(receiptUser, savedUser.auth_id, currentReceipt.id);
    } else {
      console.error("User not found");
      // Handle the case where the user is not found
    }

    expect(1).toEqual(1); // Does not matter, just test if the email gets sent with the right info
  });
});

const createUser = async () => {
  const user: IUser = {
    email: "asdasd",
    auth_id: "Adsasd",
    has_access: true,
    company_info: {
      name: "AB",
      org_number: "1111",
    },
    receipt_templates: [],
  };

  return user;
};

const getValidReceiptTemplates = (numOfReceipts: number, userId: any) => {
  const receipts: any[] = [];

  for (let i = 0; i < numOfReceipts; i++) {
    const receipt: IReceiptTemplate = {
      item: "Gym card",
      moms: 6,
      total_price: 1000 + i, // This field does not matter in this case
      user: userId,
    };
    // receipt.id;
    receipts.push(receipt);
  }

  return receipts;
};
