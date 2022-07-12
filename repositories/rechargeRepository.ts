import { connection } from "../config/database.js";
import dayjs from "dayjs";

export interface Recharge {
  id: number;
  cardId: number;
  timestamp: number;
  amount: number;
}
export type RechargeInsertData = Omit<Recharge, "id">;

export async function findByCardId(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
    `SELECT * FROM recharges WHERE "cardId"=$1`,
    [cardId]
  );

  return result.rows;
}

export async function insert(rechargeData: RechargeInsertData) {
  const { cardId, amount, timestamp } = rechargeData;

  connection.query<any, [number, number, number]>(
    `INSERT INTO recharges ("cardId", amount, timestamp) VALUES ($1, $2, $3)`,
    [cardId, amount, timestamp]
  );
}
