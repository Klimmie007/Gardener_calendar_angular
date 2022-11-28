export class Preserve {
  private name: string;
  private description: string;
  private dateOfProduction: Date;
  private expirationDate: Date;
  private _id: string = "";

  constructor(name: string, description: string, dateOfProduction: Date, expirationDate: Date) {
    this.name = name;
    this.description = description;
    this.dateOfProduction = dateOfProduction;
    this.expirationDate = expirationDate;
  }

  get Name(): string {
    return this.name;
  }

  set Name(name: string) {
    this.name = name;
  }
  get Description(): string {
    return this.description;
  }

  set Description(description: string) {
    this.description = description;
  }

  get DateOfProduction(): Date {
    return this.dateOfProduction;
  }

  set DateOfProduction(date: Date) {
    this.dateOfProduction = date;
  }

  get ExpirationDate(): Date {
    return this.expirationDate;
  }

  set ExpirationDate(date: Date) {
    this.expirationDate = date;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public toJSON(): Object {
    return {name: this.name, description: this.description, dateOfProduction: this.dateOfProduction, expirationDate: this.expirationDate};
  }
}
