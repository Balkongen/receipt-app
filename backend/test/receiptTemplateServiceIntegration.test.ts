import { describe, test, expect, jest, afterEach } from "@jest/globals";
import * as receiptService from "../src/service/receiptTemplateService";
import * as mockReceiptTemplateRepository from "../src/repositories/receiptTemplateRepository";
import * as mockUserService from "../src/service/userService";
import * as mockUserRepository from "../src/repositories/userRepository";
import { User, IUser } from "../src/models/UserModel";
import {
  IReceiptTemplate,
  ReceiptTemplate,
} from "../src/models/ReceiptTemplate";
import exp from "constants";

jest.mock("../src/repositories/receiptTemplateRepository");
jest.mock("../src/service/userService");
jest.mock("../src/repositories/userRepository");

const INVALID_USER_ID: string = "111";
const VALID_USER_ID: string = "222"; // Not valid format
const VALID_EMAIL: string = "johndoe@mail.com";

// Helper methods
const getValidUser = () => {
  return new User({
    email: VALID_EMAIL,
    auth_id: VALID_USER_ID,
    has_access: true,
    receipt_templates: [], // Empty
  });
};

const getValidReceiptTemplates = (numOfReceipts: number, userId: string) => {
  const receipts: any[] = [];

  for (let i = 0; i < numOfReceipts; i++) {
    const receipt = new ReceiptTemplate({
      item: "Gym card",
      moms: 6,
      total_price: 1000 + i, // This field does not matter in this case
      user: userId,
    });
    receipt.id;
    receipts.push(receipt);
  }

  return receipts;
};

describe("getTemplates", () => {
  afterEach(() => {
    jest.resetAllMocks(); // Ensure mocks are reset after each test
  });

  test("Should return null, invalid userID", async () => {
    jest
      .spyOn(mockReceiptTemplateRepository, "getReceiptTemplatesByUserId")
      .mockResolvedValueOnce([]);
    jest.spyOn(mockUserService, "getUserByAuthId").mockResolvedValueOnce(null);

    await expect(
      receiptService.getReceiptTemplatesByUserAuthId(INVALID_USER_ID)
    ).rejects.toThrow();

    return;
  });

  test("Should return empty array, user exists", async () => {
    const user = getValidUser();

    jest
      .spyOn(mockReceiptTemplateRepository, "getReceiptTemplatesByUserId")
      .mockResolvedValueOnce([]);
    jest.spyOn(mockUserService, "getUserByAuthId").mockResolvedValueOnce(user);

    await expect(
      receiptService.getReceiptTemplatesByUserAuthId(user.auth_id)
    ).resolves.toEqual([]); // Empty array
  });

  test("Should return one receiptTemplate", async () => {
    const user = getValidUser();
    const receiptTemplates = getValidReceiptTemplates(1, user.id);
    user.receipt_templates.push(receiptTemplates[0].id);

    jest
      .spyOn(mockReceiptTemplateRepository, "getReceiptTemplatesByUserId")
      .mockResolvedValueOnce(receiptTemplates);
    jest.spyOn(mockUserService, "getUserByAuthId").mockResolvedValueOnce(user);

    await expect(
      receiptService.getReceiptTemplatesByUserAuthId(user.auth_id)
    ).resolves.toEqual(receiptTemplates);
  });

  test("Should return two receiptTemplates", async () => {
    const user = getValidUser();
    const receiptTemplates = getValidReceiptTemplates(2, user.id);
    user.receipt_templates.push(receiptTemplates[0].id);
    user.receipt_templates.push(receiptTemplates[1].id);

    jest
      .spyOn(mockReceiptTemplateRepository, "getReceiptTemplatesByUserId")
      .mockResolvedValueOnce(receiptTemplates);
    jest.spyOn(mockUserService, "getUserByAuthId").mockResolvedValueOnce(user);

    await expect(
      receiptService.getReceiptTemplatesByUserAuthId(user.auth_id)
    ).resolves.toEqual(receiptTemplates);
  });
});

describe("createTemplates", () => {
  afterEach(() => {
    jest.resetAllMocks(); // Ensure mocks are reset after each test
  });

  test.skip("Should create a receiptTemplate", async () => {
    const user = getValidUser();
    const receiptTemplates = getValidReceiptTemplates(1, "");

    jest
      .spyOn(mockReceiptTemplateRepository, "createRecieptTemplate")
      .mockResolvedValueOnce(receiptTemplates[0]);
    jest
      .spyOn(mockUserRepository, "setReceiptTemplateToUser")
      .mockResolvedValueOnce(user);
    jest
      .spyOn(mockUserRepository, "getUserByAuthId")
      .mockResolvedValueOnce(user);
    const result = await receiptService.createReceiptTemplate(
      receiptTemplates[0],
      user.auth_id
    );
    console.log("RESULT: ", result);
    console.log("USER: ", user);

    await expect(result).toEqual(receiptTemplates[0]);
    expect(mockUserService.getUserByAuthId).toHaveBeenCalledWith(user.auth_id);
  });
});
