import { Router } from "express";
import {
  createReceiptTemplate,
  getReceiptTemplatesByUserAuthId,
  deleteReceiptTemplate,
} from "../controllers/receiptTemplateController";

const router: Router = Router();

router.post("/", createReceiptTemplate);
router.get("/", getReceiptTemplatesByUserAuthId);
router.delete("/:id", deleteReceiptTemplate);

export default router;
