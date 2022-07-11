import { Router } from "express";
import companyRouter from "./companyRouter.js";
import employeeRouter from "./employeeRouter.js";

const router = Router();

router.use(companyRouter);
router.use(employeeRouter);

export default router;


/* rotas
criação: post - /create-card
visualização de saldo: get - /balance/:id
bloqueio e desbloqueio: put - /status/:id
ativação: put - /card/enable/:id

recarga: post - /recharge/:id
compras: post - /shopping/:id
*/