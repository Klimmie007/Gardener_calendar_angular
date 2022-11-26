enum PlantType{
    Plant = "Plant",
    Bush = "Bush", 
    Tree = "Tree"
}

interface IPlant{
    name: string
    image: string
    icon: string
    sowingSeason: DateRange
    whenYields(date: Date): DateRange
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