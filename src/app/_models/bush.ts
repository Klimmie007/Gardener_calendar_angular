import { DateRange, IPlant, PlantType } from "./plantInterface";

export class Bush implements IPlant
{
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _image: string;
    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }
    private _icon: string;
    public get icon(): string {
        return this._icon;
    }
    public set icon(value: string) {
        this._icon = value;
    }
    private _sowingSeason: DateRange;
    public get sowingSeason(): DateRange {
        return this._sowingSeason;
    }
    public set sowingSeason(value: DateRange) {
        this._sowingSeason = value;
    }
    private yieldSeason: DateRange;
    whenYields(date: Date): DateRange {
        return this.yieldSeason
    }
    constructor(sowSeason: DateRange, yieldSeason: DateRange, expectedYieldInkg: number, name: string, image: string, icon: string, id: string = "")
    {
        this._sowingSeason = sowSeason
        this.yieldSeason = yieldSeason
        this._expectedYieldInkg = expectedYieldInkg
        this._name = name
        this._icon = icon
        this._image = image
        this._id = id
    }

    public toJSON(): Object {
        return {sowingSeasonStart: this.sowingSeason.start, 
            sowingSeasonEnd: this.sowingSeason.end, 
            yieldSeasonStart: this.yieldSeason.start, 
            yieldSeasonEnd: this.yieldSeason.end, 
            name: this.name, 
            icon: this.icon, 
            image: this.image, 
            type: PlantType.Bush}
    }

    private _expectedYieldInkg: number;
    public get expectedYieldInkg(): number {
        return this._expectedYieldInkg;
    }
    public set expectedYieldInkg(value: number) {
        this._expectedYieldInkg = value;
    }
    private _id: string
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}