export class PointMonitoringModel {
    id: number;
    lastActive: Date;
    state:number;
    versionLogic: string;
    versionFlash: string;
    versionService:string;
    printerLenta: number;
    cashcodeStatus: string;
    online: boolean;
    metka: string;
    msgCount: number;
    paymentDate: Date;
    noteDate: Date;
    noteFinishedDate: Date;
    status: number;
    blockReason: string;
    stateDate: Date;
    errorDevices: number;
    allDevicesErrors: number;
    notIgnoredDevicesErrors: number;
    serverId: number;
}