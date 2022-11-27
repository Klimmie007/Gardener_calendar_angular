import { Bush } from "./bush";
import { IPlant, PlantType } from "./plantInterface";

export class Tree extends Bush implements IPlant
{
    public override toJSON(): Object {
        let tmp: Object = super.toJSON()
        let tmp2: Object = {type: PlantType.Tree}
        return Object.assign(tmp, tmp2)
    }
}