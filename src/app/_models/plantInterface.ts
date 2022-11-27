enum PlantType{
    Plant = "Plant",
    Bush = "Bush", 
    Tree = "Tree"
}

interface IPlant{
    id: string
    name: string
    image: string
    icon: string
    sowingSeason: DateRange
    expectedYieldInkg: number
    whenYields(date: Date): DateRange
    toJSON(): Object
}

class DateRange{
    start: Date
    end: Date
    constructor(startDate: Date, endDate: Date)
    {
        this.start = startDate
        this.end = endDate
    }
}
export {IPlant, DateRange, PlantType}