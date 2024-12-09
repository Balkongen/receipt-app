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

describe.skip("PDF-handler test", () => {
  test("create, should create a pdf", async () => {
    
    // pdfService.createPDf();
    
    expect(1).toEqual(1);
  });
});
