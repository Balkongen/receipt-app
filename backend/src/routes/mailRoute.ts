import { Router } from "express";
import { sendMailToUser } from "../controllers/mailController";

const router: Router = Router();

router.post("/:id", sendMailToUser);


export default router;
