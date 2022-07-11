import { Router } from "express";

const employeeRouter = Router();

employeeRouter.get("/balance/:id");
employeeRouter.put("/status/:id");
employeeRouter.put("/card/enable/:id");
employeeRouter.post("/shoppping");

export default employeeRouter;