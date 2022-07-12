import { Router } from "express";
import { viewTransactions, changeCardStatus, activateCard, shopping } from "../controllers/employeeController.js"

const employeeRouter = Router();

employeeRouter.get("/balance/:id", viewTransactions); // foi
employeeRouter.put("/status/:id", changeCardStatus); // foi
employeeRouter.put("/card/enable/:id", activateCard); // foi
employeeRouter.post("/shoppping", shopping);

export default employeeRouter;