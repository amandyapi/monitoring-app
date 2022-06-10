import { KioskModel } from "./kiosk.model";
import { ServiceModel} from "./service.model";

export class TransactionModel{
    id: string;
    clientCode: string;
    clientAccount: string;
    creditAccount: string;
    operationRef: string;
    amount: number;
    status: number;
    note_10000: number;
    note_5000: number;
    note_2000: number;
    note_1000: number;
    operationType: number;
    created: string;
    modified: string;
    effectiveDate: string;
    service: ServiceModel
    kiosk: KioskModel
  }