import { PointCassetteModel } from "./pointCassette.model";
import { PointMonitoringModel } from "./pointMonitoring.model";

export class KioskModel{
    id: number;
    extId: string;
    name: string;
    enable: boolean;
    inputDate: Date;
    removed: Boolean;
    configId:number;
    pointType: number;
    clientId: number;
    address: string;
    timeZoneName: string;
    autoDaylightTime: boolean;
    groupId:0;
    pointsCassettes: PointCassetteModel[];
    pointsMonitorings: PointMonitoringModel[];
}


