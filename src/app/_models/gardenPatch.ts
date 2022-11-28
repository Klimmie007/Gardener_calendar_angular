export class GardenPatch {
  private name: string;
  private type: string;
  private amount: number;
  private _id: string;
  

  constructor(name: string, type: string, amount: number, id: string="") {
    this.name = name;
    this.type = type;
    this.amount = amount;
    this._id = id;
  }

  get Name(): string {
    return this.name;
  }

  set Name(name: string) {
    this.name = name;
  }

  get Type(): string {
    return this.type;
  }

  set Type(type: string) {
    this.type = type;
  }

  get Amount(): number {
    return this.amount;
  }

  set Amount(amount: number) {
    this.amount = amount;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public toJson(): Object {
    return {name: this.name, type: this.type, amount: this.amount};
  }
}
