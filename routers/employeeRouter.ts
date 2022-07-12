import { Router } from "express";
import { viewTransactions, changeCardStatus, activateCard, shopping } from "../controllers/employeeController.js"

const employeeRouter = Router();

employeeRouter.get("/balance/:id", viewTransactions);
employeeRouter.put("/status/:id", changeCardStatus);
employeeRouter.put("/card/enable/:id", activateCard);
employeeRouter.post("/shoppping", shopping);

export default employeeRouter;