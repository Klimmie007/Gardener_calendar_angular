export class day
{
    private _Number: number;
    public constructor(Number: number)
    {
        this._Number = Number;
    }
    get Number():number
    {
        return this._Number;
    }
    set Number(Number: number)
    {
        this._Number = Number;
    }
}