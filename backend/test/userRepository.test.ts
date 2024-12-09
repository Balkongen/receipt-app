import { describe, test, expect, jest } from "@jest/globals";

import { User, IUser } from "../src/models/UserModel";
import * as mockUser from "../src/models/UserModel";


jest.mock("../src/models/UserModel");

describe("getUserByAuthId", () => {
    test("Should return null", async () => {
        jest.spyOn(mockUser.User, "findOne").mockResolvedValueOnce(null);
    })
})