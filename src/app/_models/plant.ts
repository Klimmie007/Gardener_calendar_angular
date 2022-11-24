export class Plant
{
    private _sowingSeasonStart: Date
    public get sowingSeasonStart(): Date {
        return this._sowingSeasonStart
    }
    public set sowingSeasonStart(value: Date) {
        this._sowingSeasonStart = value
    }
    private _sowingSeasonEnds: Date
    public get sowingSeasonEnds(): Date {
        return this._sowingSeasonEnds
    }
    public set sowingSeasonEnds(value: Date) {
        this._sowingSeasonEnds = value
    }
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
    

    constructor(sowSeasonStart: Date, sowSeasonEnd: Date, minVegetationTimeInDays: number, maxVegetationTimeInDays: number, name: string, image: string, icon: string)
    {
        this._sowingSeasonStart = sowSeasonStart
        this._sowingSeasonEnds = sowSeasonEnd
        this._minVegetationCycleInDays = minVegetationTimeInDays
        this._maxVegetationCycleInDays = maxVegetationTimeInDays
        this._name = name
        this._image = image
        this._icon = icon
    }
}