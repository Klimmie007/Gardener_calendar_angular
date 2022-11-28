import { GardenPatch } from "./gardenPatch";
import { IPlant } from "./plantInterface";

export class SowedPlant {
    private _gardenPatch: GardenPatch;
    public get gardenPatch(): GardenPatch {
        return this._gardenPatch;
    }
    public set gardenPatch(value: GardenPatch) {
        this._gardenPatch = value;
    }
    private _plant: IPlant;
    public get plant(): IPlant {
        return this._plant;
    }
    public set plant(value: IPlant) {
        this._plant = value;
    }
    private _date: Date;
    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }
    constructor(gardenPatch: GardenPatch, plant: IPlant, date: Date=new Date, id: string=""){
        this._gardenPatch = gardenPatch; 
        this._plant = plant
        this._date = date
        this._id = id
    }

    public toJSON(): Object
    {
        return {gardenPatchID: this.gardenPatch.id, plantID: this._plant.id, dateSowed: this._date}
    }

    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
}