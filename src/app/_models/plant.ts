import { IPlant, DateRange, PlantType } from "./plantInterface"

export class Plant implements IPlant
{
    private _minVegetationCycleInDays: number
    public get minVegetationCycleInDays(): number {
        return this._minVegetationCycleInDays
    }
    public set minVegetationCycleInDays(value: number) {
        this._minVegetationCycleInDays = value
    }
    private _maxVegetationCycleInDays: number
    public get maxVegetationCycleInDays(): number {
        return this._maxVegetationCycleInDays
    }
    public set maxVegetationCycleInDays(value: number) {
        this._maxVegetationCycleInDays = value
    }
    private _name: string
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    private _image: string
    public get image(): string {
        return this._image
    }
    public set image(value: string) {
        this._image = value
    }
    private _icon: string
    public get icon(): string {
        return this._icon
    }
    public set icon(value: string) {
        this._icon = value
    }
    public whenYields(date: Date): DateRange {
        let startRange, endRange: Date
        startRange = new Date(date)
        startRange.setDate(startRange.getDate() + this.minVegetationCycleInDays)
        endRange = new Date(date)
        endRange.setDate(endRange.getDate() + this.maxVegetationCycleInDays)
        return new DateRange(startRange, endRange)
    }
    

    constructor(sowSeason: DateRange, minVegetationTimeInDays: number, maxVegetationTimeInDays: number, expectedYieldInkg: number, name: string, image: string, icon: string, id: string = "")
    {
        this._sowingSeason = sowSeason
        this._minVegetationCycleInDays = minVegetationTimeInDays
        this._maxVegetationCycleInDays = maxVegetationTimeInDays
        this._expectedYieldInkg = expectedYieldInkg
        this._name = name
        this._image = image
        this._icon = icon
        this._id = id
    }
    private _sowingSeason: DateRange
    public get sowingSeason(): DateRange {
        return this._sowingSeason
    }
    public set sowingSeason(value: DateRange) {
        this._sowingSeason = value
    }
    toJSON(): Object {
        return {sowingSeasonStart: this.sowingSeason.start, sowingSeasonEnd: this.sowingSeason.end, minVegetationCycleInDays: this.minVegetationCycleInDays, maxVegetationCycleInDays: this.maxVegetationCycleInDays, name: this.name, icon: this.icon, image: this.image, type: PlantType.Plant}
    }
    private _expectedYieldInkg: number
    public get expectedYieldInkg(): number {
        return this._expectedYieldInkg
    }
    public set expectedYieldInkg(value: number) {
        this._expectedYieldInkg = value
    }
    private _id: string = ""
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}