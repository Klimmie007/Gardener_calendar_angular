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

  public toJSON(): Object {
    return {name: this.name, description: this.description, dateOfProduction: this.dateOfProduction, expirationDate: this.expirationDate};
  }
}

export let preserves: Preserve[] = [
  new Preserve(`name1`, `desc1`, `2022-01-01`, `2022-09-01`),
  new Preserve(`name2`, `desc2`, `2022-01-01`, `2022-09-01`),
  new Preserve(`name3`, `desc3`, `2022-01-01`, `2022-09-01`),
  new Preserve(`name4`, `desc4`, `2022-01-01`, `2022-09-01`),
  new Preserve(`name5`, `desc5`, `2022-01-01`, `2022-09-01`),
  new Preserve(`name6`, `desc6`, `2022-01-01`, `2022-09-01`),
  new Preserve(`name7`, `desc7`, `2022-01-01`, `2022-09-01`),
  new Preserve(`name8`, `desc8`, `2022-01-01`, `2022-09-01`),
  new Preserve(`name9`, `desc9`, `2022-01-01`, `2022-09-01`),
  new Preserve(`name10`, `desc10`, `2022-01-01`, `2022-09-01`)
];
