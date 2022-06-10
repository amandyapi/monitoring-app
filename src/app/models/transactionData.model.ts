import { TransactionModel } from "./transaction.model";

export class TransactionData {
    data: TransactionModel[];
    pageNumber: number;
    totalPages: number;
    totalItemsCount: number
  }