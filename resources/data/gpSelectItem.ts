import {SelectItem} from "primeng/primeng";

export interface gpSelectItem extends SelectItem
{
    label: string;
    value: any;
    additional: any;
}
