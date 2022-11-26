import { DateRange, IPlant } from "./plantInterface";

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
    constructor(sowSeason: DateRange, yieldSeason: DateRange, name: string, image: string, icon: string)
    {
        this._sowingSeason = sowSeason
        this.yieldSeason = yieldSeason
        this._name = name
        this._icon = icon
        this._image = image
    }
}