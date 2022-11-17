export class Preserve {
  name: string;
  description: string;
  dateOfProduction: Date;
  expirationDate: Date;

  constructor(name: string, description: string, dateOfProduction: string, expirationDate: string) {
    this.name = name;
    this.description = description;
    this.dateOfProduction = new Date(dateOfProduction);
    this.expirationDate = new Date(expirationDate);
  }
}
