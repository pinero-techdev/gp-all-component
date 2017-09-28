import {SelectItem} from "primeng/primeng";

export interface GPSelectItem extends SelectItem
{
    label: string;
    value: any;
    additional: any;
}
