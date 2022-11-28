import { IPlant } from "./plantInterface";

export class Harvest{
    private _weight: number;
    public get weight(): number {
        return this._weight;
    }
    public set weight(value: number) {
        this._weight = value;
    }
    private _harvestedPlant: IPlant;
    public get harvestedPlant(): IPlant {
        return this._harvestedPlant;
    }
    public set harvestedPlant(value: IPlant) {
        this._harvestedPlant = value;
    }
    private _harvestDate: Date;
    public get harvestDate(): Date {
        return this._harvestDate;
    }
    public set harvestDate(value: Date) {
        this._harvestDate = value;
    }
    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    constructor(weight: number, harvestedPlant: IPlant, harvestDate: Date = new Date(), id: string = "") {
        this._weight = weight;
        this._harvestedPlant = harvestedPlant;
        this._harvestDate = new Date(harvestDate);
        this._id = id
    }

    public toJSON(): Object
    {
        return {weight: this._weight, plant: this._harvestedPlant.id, harvestDate: this._harvestDate}
    }
}
 
