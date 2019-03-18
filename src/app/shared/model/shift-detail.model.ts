import { ListItem } from "./list-item";
import { CustomDate } from "./custom-date.model";

export class ShiftDetail {
    shiftDay:number;
    shiftDate:string;
    shiftName:string;
    shiftShortName :string;
    shiftCssClass : string;
    shiftId:number;
}

export class UserShiftDetail
{
    employeeId:string;
    employeeName :string;
    monthShift : ShiftDetail[];
}

export class EmpShiftDistributionForDay{
    currentDt:number;
    shiftCounter:ListItem[];   
}

export class CustomCalendarEvent{
    title: string;
    start: CustomDate;
    color:any;
    meta :any;
}