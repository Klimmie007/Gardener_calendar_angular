export class GardenPatch {
  private name: string;
  private type: string;
  private amount: number;

  constructor(name: string, type: string, amount: number) {
    this.name = name;
    this.type = type;
    this.amount = amount;
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

  public toJson(): Object {
    return {name: this.name, type: this.type, amount: this.amount};
  }
}
