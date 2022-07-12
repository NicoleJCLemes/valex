import { Router } from "express";
import { createCard, rechargeCard } from "../controllers/companyController.js";

const companyRouter = Router();

companyRouter.post("/create-card", createCard);
companyRouter.post("/recharge/:id", rechargeCard);

export default companyRouter;