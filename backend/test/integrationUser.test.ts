import {
  describe,
  test,
  expect,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals";
import * as receiptService from "../src/service/receiptTemplateService";
import * as userService from "../src/service/userService";
import { User, IUser } from "../src/models/UserModel";
import {
  IReceiptTemplate,
  ReceiptTemplate,
} from "../src/models/ReceiptTemplate";
import * as dbHandler from "./dbTestHandler";

const INVALID_USER_ID: string = "111";
const VALID_USER_ID: string = "222"; // Not valid format
const VALID_EMAIL: string = "johndoe@mail.com";

// Helper methods
const getValidUser = () => {
  return new User({
    email: VALID_EMAIL,
    auth_id: VALID_USER_ID,
    has_access: true,
    company_info: {
      name: "AB",
      org_number: "1111",
    },
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
    // receipt.id;
    receipts.push(receipt);
  }

  return receipts;
};

describe("Integrationtests", () => {
  beforeEach(async () => {
    await dbHandler.initializeMongoServer();
  });

  afterEach(async () => {
    await dbHandler.kill();
  });

  test("getUser, should successfully set & get information from the database", async () => {
    const user = new User({
      email: "asdasd",
      auth_id: "Adsasd",
      has_access: true,
      company_info: {
        name: "AB",
        org_number: "1111",
      },
      receipt_templates: [],
    });

    await user.save();
    const retrievedUser = await userService.getUserByAuthId(user.auth_id);

    expect(user.id).toEqual(retrievedUser?.id);
  });

  test("create receiptTemplate, should return receiptTemplate", async () => {
    const user = getValidUser();

    const receiptTemplates = getValidReceiptTemplates(1, user.auth_id);

    await user.save();
    const res = await receiptService.createReceiptTemplate(
      receiptTemplates[0],
      user.auth_id
    );

    const actual = await receiptService.getReceiptTemplatesByUserAuthId(
      user.auth_id
    );

    expect(actual[0].id).toEqual(receiptTemplates[0].id);
  });

  test("create receiptTemplate, user should have a receiptTemplate", async () => {
    const user = getValidUser();

    const receiptTemplates = getValidReceiptTemplates(1, user.auth_id);

    await user.save();
    const res = await receiptService.createReceiptTemplate(
      receiptTemplates[0],
      user.auth_id
    );
    const updatedUser = await User.findById(user.id).exec();

    expect(updatedUser?.receipt_templates.length).toEqual(
      receiptTemplates.length
    );
  });

  test("create receiptTemplate, user should have two receiptTemplates", async () => {
    const user = getValidUser();

    const receiptTemplates = getValidReceiptTemplates(2, user.auth_id);

    await user.save();
    const res = await receiptService.createReceiptTemplate(
      receiptTemplates[0],
      user.auth_id
    );
    const resTwo = await receiptService.createReceiptTemplate(
      receiptTemplates[1],
      user.auth_id
    );

    const updatedUser = await User.findById(user.id).exec();

    expect(updatedUser?.receipt_templates.length).toEqual(
      receiptTemplates.length
    );
  });

  test("deleteReceiptTemplate, no added receipts and user has no receipts", async () => {
    const user = getValidUser();

    await user.save();

    const receiptTemplate = getValidReceiptTemplates(1, user.id);

    await expect(async () => {
      const res = await receiptService.deleteReceiptTemplate(
        receiptTemplate[0].id,
        user.auth_id
      ); // Wrong user
    }).rejects.toThrow();
  });

  test("deleteReceiptTemplate, passing wrong userID", async () => {
    const user = getValidUser();

    const userTwo = new User({
      email: "11111",
      auth_id: "4444",
      has_access: true,
      company_info: {
        name: "AB",
        org_number: "1111",
      },
      receipt_templates: [],
    });

    await userTwo.save();
    await user.save();
    const receiptTemplate = getValidReceiptTemplates(1, user.id);
    await receiptService.createReceiptTemplate(
      receiptTemplate[0],
      user.auth_id
    );

    await expect(async () => {
      const res = await receiptService.deleteReceiptTemplate(
        receiptTemplate[0].id,
        userTwo.auth_id
      ); // Wrong user
    }).rejects.toThrow();
  });

  test("deleteReceiptTemplate, should have deleted receipt and from user", async () => {
    const user = getValidUser();

    await user.save();
    const receiptTemplates = getValidReceiptTemplates(1, user.id);

    await receiptService.createReceiptTemplate(
      receiptTemplates[0],
      user.auth_id
    );

    const res = await receiptService.deleteReceiptTemplate(
      receiptTemplates[0].id,
      user.auth_id
    );
    const updatedUser = await User.findById(user.id).exec();

    expect(updatedUser?.receipt_templates.length).toEqual(0);
  });

  test("deleteReceiptTemplate, No receipts should be in the database", async () => {
    const user = getValidUser();

    await user.save();
    const receiptTemplates = getValidReceiptTemplates(1, user.id);

    await receiptService.createReceiptTemplate(
      receiptTemplates[0],
      user.auth_id
    );

    const res = await receiptService.deleteReceiptTemplate(
      receiptTemplates[0].id,
      user.auth_id
    );

    expect((await ReceiptTemplate.find()).length).toEqual(0);
  });

  test("deleteUser, should delete user and their receipt templates when user exists", async () => {
    const user = getValidUser();
    await user.save();

    const receiptTemplates = getValidReceiptTemplates(1, user.id);
    for (let template of receiptTemplates) {
      await template.save();
      user.receipt_templates.push(template.id);
    }
    await user.save();

    await userService.deleteUser(user.auth_id);

    const deletedUser = await User.findOne({ auth_id: user.auth_id });
    expect(deletedUser).toBeNull();

    const remainingReceiptTemplates = await ReceiptTemplate.find({
      user_id: user.id,
    });
    expect(remainingReceiptTemplates.length).toBe(0);
  });

  test("should throw an error if user does not exist", async () => {
    // Attempt to delete a user that does not exist in the database
    const nonExistentAuthId = "non_existent_auth_id";

    await expect(userService.deleteUser(nonExistentAuthId)).rejects.toThrow(
      "User does not exist in database"
    );

    // Verify that no user with the given auth_id exists
    const user = await User.findOne({ auth_id: nonExistentAuthId });
    expect(user).toBeNull();
  });

  test("should delete user with multiple receipt templates", async () => {
    const user = getValidUser();
    await user.save();

    const receiptTemplates = getValidReceiptTemplates(3, user.id);
    for (let template of receiptTemplates) {
      await template.save();
      user.receipt_templates.push(template.id);
    }
    await user.save();

    await userService.deleteUser(user.auth_id);

    const deletedUser = await User.findOne({ auth_id: user.auth_id });
    expect(deletedUser).toBeNull();

    const remainingReceiptTemplates = await ReceiptTemplate.find({
      user_id: user.id,
    });
    expect(remainingReceiptTemplates.length).toBe(0);
  });

  test('should return true if the user is registered', async () => {
    const userAuthId = 'existing-user-id';
    await new User({
      email: 'test@example.com',
      auth_id: userAuthId,
      has_access: true,
      company_info: { name: 'Test Company', org_number: '123456' },
      receipt_templates: [],
    }).save();

    const result = await userService.isUserRegistered(userAuthId);
    expect(result).toBe(true);
  });

  test('should return false if the user is not registered', async () => {
    const userAuthId = 'non-existing-user-id';

    const result = await userService.isUserRegistered(userAuthId);
    expect(result).toBe(false);
  });
});
