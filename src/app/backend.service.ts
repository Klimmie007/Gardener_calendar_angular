import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
//import { Preserve } from '../app/_models/preserve';
import { DateRange, IPlant, PlantType } from './_models/plantInterface';
import { isNgTemplate } from '@angular/compiler';
import { Plant } from './_models/plant';
import { Bush } from './_models/bush';
import { Tree } from './_models/tree';
import { Harvest } from './_models/harvest';
import { SowedPlant } from './_models/sowedPlant';
import { GardenPatch } from './_models/gardenPatch';

interface token{
  token: string
}

interface User{
  email: string
  nickname: string
}

interface Preserve {
  name: string;
  description: string;
  dateOfProduction: Date;
  expirationDate: Date;
}

interface IGardenPatch {
  name: string;
  type: string;
  amount: number;
  _id: string
}

interface IPlantBackend {
  _id: string,
  minVegetationCycleInDays: number,
  maxVegetationCycleInDays: number,
  name: string,
  image: string,
  icon: string,
  sowingSeasonStart: Date,
  sowingSeasonEnd: Date,
  yieldSeasonStart: Date,
  yieldSeasonEnd: Date,
  expectedYieldInkg: number,
  type: string,
}

interface sowedPlantBackend{
  _id: string,
  gardenPatchID: IGardenPatch,
  plantID: IPlantBackend,
  dateSowed: Date
}

interface harvestBackend{
  _id: string,
  weight: number,
  harvestedPlant: IPlantBackend,
  harvestDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private _registerURL: string = "http://localhost:3000/api/register"
  private _loginURL: string = "http://localhost:3000/api/login"
  private _userURL: string = "http://localhost:3000/api/user"
  private _preservesURL: string = "http://localhost:3000/api/preserves"
  private _gardenPatchesURL: string = "http://localhost:3000/api/gardenPatches"
  private _plantsURL: string = "http://localhost:3000/api/plant"
  private _harvestURL: string  = "http://localhost:3000/api/harvest"
  private _sowPlantURL: string = "http://localhost:3000/api/sowedPlant"
  private _sowPlantRemoveURL: string = this._sowPlantURL + "/remove"
  private _emailURL: string = this._userURL + "/email"
  private _nicknameURL: string =  this._userURL + "/nickname"
  private _passwordURL: string = this._userURL + "/password"
  private _deleteURL: string = this._userURL + "/delete"
  private _plantDateURL: string = this._plantsURL + "/date/sow"
  private _plantByIDURL: string = this._plantsURL + "/id"
  private header: HttpHeaders = new HttpHeaders({token: localStorage.getItem('token') || ""})
  constructor(private http: HttpClient) { }

  public registerUser(user: Object) : Observable<token> {
    return this.http.post<token>(this._registerURL, user)
  }
  public loginUser(user: Object) : Observable<token> {
    return this.http.post<token>(this._loginURL, user)
  }
  public getUser() : Observable<User>
  {
    this.header.set('token', localStorage.getItem('token') || "")
    return this.http.post<User>(this._userURL, null, {headers: this.header})
  }

  public loggedIn(): boolean
  {
    //return this.http.post<verify>(this._tokenURL, null, {headers: new HttpHeaders({token: localStorage.getItem("token") || ""})})
    return !!localStorage.getItem('token')
  }
  public setEmail(email: string)
  {
    this.header.set('token', localStorage.getItem('token') || "")
    return this.http.put(this._emailURL, {email: email}, {headers: this.header})
  }
  public setNickname(nickname: string)
  {
    this.header.set('token', localStorage.getItem('token') || "")
    return this.http.put(this._nicknameURL, {nickname: nickname}, {headers: this.header})
  }
  public setPassword(password: string)
  {
    this.header.set('token', localStorage.getItem('token') || "")
    return this.http.put(this._passwordURL, {password: password}, {headers: this.header})
  }
  public deleteAccount()
  {
    this.header.set('token', localStorage.getItem('token') || "")
    return this.http.delete(this._deleteURL, {headers: this.header})
  }

  // Preserve
  public addPreserve(preserve: Object): Observable<Object> {
    return this.http.post<Object>(this._preservesURL, preserve);
  }

  public getPreserves(): Observable<Array<Preserve>> {
    return this.http.get<Array<Preserve>>(this._preservesURL);
  }

  // Garden Patch
  public addGardenPatch(gardenPatch: Object): Observable<Object> {
    return this.http.post<Object>(this._gardenPatchesURL, gardenPatch);
  }

  public getGardenPatches(): Observable<Array<IGardenPatch>> {
    return this.http.get<Array<IGardenPatch>>(this._gardenPatchesURL);
  }
  //plant
  public addPlant(plant: IPlant) : IPlant | null {
    let tmp: Observable<IPlantBackend>= this.http.post<IPlantBackend>(this._plantsURL, plant.toJSON())
    let retVal: IPlant | null = null
    tmp.subscribe(
      res => {
        switch(res.type)
        {
          case PlantType.Plant:
          {
            retVal = new Plant(new DateRange(res.sowingSeasonStart, res.sowingSeasonEnd), res.minVegetationCycleInDays, res.maxVegetationCycleInDays, res.expectedYieldInkg, res.name, res.image, res.icon)
            retVal.id = res._id
            break;
          }
          case PlantType.Bush:
          {
            retVal = new Bush(new DateRange(res.sowingSeasonStart, res.sowingSeasonEnd), new DateRange(res.yieldSeasonStart, res.yieldSeasonEnd), res.expectedYieldInkg, res.name, res.image, res.icon)
            retVal.id = res._id
            break;
          }
          case PlantType.Tree:
          {
            retVal = new Tree(new DateRange(res.sowingSeasonStart, res.sowingSeasonEnd), new DateRange(res.yieldSeasonStart, res.yieldSeasonEnd), res.expectedYieldInkg, res.name, res.image, res.icon)
            retVal.id = res._id
            break;
          }
        }
        
      }
    )
    return retVal
  }

  public getPlants() : IPlant[]
  {
    let tmp: Observable<Array<IPlantBackend>> = this.http.get<Array<IPlantBackend>>(this._plantsURL)
    let retVal: IPlant[] = []
    tmp.subscribe(
      res => {
        res.forEach(plant => {
          switch(plant.type)
        {
          case PlantType.Plant:
          {
            let tmp: Plant = new Plant(new DateRange(new Date (plant.sowingSeasonStart), new Date (plant.sowingSeasonEnd)), plant.minVegetationCycleInDays, plant.maxVegetationCycleInDays, plant.expectedYieldInkg, plant.name, plant.image, plant.icon)
            tmp.id = plant._id
            retVal.push(tmp)
            break;
          }
          case PlantType.Bush:
          {
            let tmp: Bush = new Bush(new DateRange(new Date (plant.sowingSeasonStart), new Date (plant.sowingSeasonEnd)), new DateRange(new Date (plant.yieldSeasonStart), new Date (plant.yieldSeasonEnd)),  plant.expectedYieldInkg, plant.name, plant.image, plant.icon)
            tmp.id = plant._id
            retVal.push(tmp)
            break;
          }
          case PlantType.Tree:
          {
            let tmp: Tree = new Tree(new DateRange(new Date (plant.sowingSeasonStart), new Date (plant.sowingSeasonEnd)), new DateRange(new Date (plant.yieldSeasonStart), new Date (plant.yieldSeasonEnd)), plant.expectedYieldInkg, plant.name, plant.image, plant.icon)
            tmp.id = plant._id
            retVal.push(tmp)
            break;
          }
        }
        });
      }
    )
    return retVal
  }

  public getPlantByID(id: string) : IPlant | null
  {
    let tmp: Observable<IPlantBackend> = this.http.post<IPlantBackend>(this._plantByIDURL, {id: id})
    let retVal: IPlant | null = null
    tmp.subscribe(
      res => {
        switch(res.type)
        {
          case PlantType.Plant:
          {
            retVal = new Plant(new DateRange(res.sowingSeasonStart, res.sowingSeasonEnd), res.minVegetationCycleInDays, res.maxVegetationCycleInDays, res.expectedYieldInkg, res.name, res.image, res.icon)
            retVal.id = res._id
            break;
          }
          case PlantType.Bush:
          {
            retVal = new Bush(new DateRange(res.sowingSeasonStart, res.sowingSeasonEnd), new DateRange(res.yieldSeasonStart, res.yieldSeasonEnd), res.expectedYieldInkg, res.name, res.image, res.icon)
            retVal.id = res._id
            break;
          }
          case PlantType.Tree:
          {
            retVal = new Tree(new DateRange(res.sowingSeasonStart, res.sowingSeasonEnd), new DateRange(res.yieldSeasonStart, res.yieldSeasonEnd), res.expectedYieldInkg, res.name, res.image, res.icon)
            retVal.id = res._id
            break;
          }
        }
      }
    )
    return retVal
  }

  public getPlantsBySowingDate(date: Date) : IPlant[]
  {
    let tmp: Observable<Array<IPlantBackend>> = this.http.get<Array<IPlantBackend>>(this._plantDateURL)
    let retVal: IPlant[] = []
    tmp.subscribe(
      res => {
        res.forEach(plant => {
          switch(plant.type)
        {
          case PlantType.Plant:
          {
            let tmp: Plant = new Plant(new DateRange(plant.sowingSeasonStart, plant.sowingSeasonEnd), plant.minVegetationCycleInDays, plant.maxVegetationCycleInDays, plant.expectedYieldInkg, plant.name, plant.image, plant.icon)
            tmp.id = plant._id
            retVal.push(tmp)
            break;
          }
          case PlantType.Bush:
          {
            let tmp: Bush = new Bush(new DateRange(plant.sowingSeasonStart, plant.sowingSeasonEnd), new DateRange(plant.yieldSeasonStart, plant.yieldSeasonEnd), plant.expectedYieldInkg, plant.name, plant.image, plant.icon)
            tmp.id = plant._id
            retVal.push(tmp)
            break;
          }
          case PlantType.Tree:
          {
            let tmp: Tree = new Tree(new DateRange(plant.sowingSeasonStart, plant.sowingSeasonEnd), new DateRange(plant.yieldSeasonStart, plant.yieldSeasonEnd), plant.expectedYieldInkg, plant.name, plant.image, plant.icon)
            tmp.id = plant._id
            retVal.push(tmp)
            break;
          }
        }
        });
      }
    )
    return retVal
  }

  //Harvest
  public addHarvest(harvest: Harvest, cropID: string) {
    console.log(cropID)
    this.http.post<SowedPlant>(this._sowPlantRemoveURL, {id: cropID}).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    console.log(harvest.toJSON())
    return this.http.put<Harvest>(this._harvestURL, harvest.toJSON());
  }

  public getHarvest(): Harvest[] {
    let retVal: Harvest[] = []
    this.http.get<Array<harvestBackend>>(this._harvestURL).subscribe(
      res => {
        res.forEach(plant => {
          console.log(plant)
          switch(plant.harvestedPlant.type)
        {
          case PlantType.Plant:
          {
            let tmp: Plant = new Plant(new DateRange(plant.harvestedPlant.sowingSeasonStart, plant.harvestedPlant.sowingSeasonEnd), plant.harvestedPlant.minVegetationCycleInDays, plant.harvestedPlant.maxVegetationCycleInDays, plant.harvestedPlant.expectedYieldInkg, plant.harvestedPlant.name, plant.harvestedPlant.image, plant.harvestedPlant.icon)
            tmp.id = plant._id
            retVal.push(new Harvest(plant.weight, tmp, new Date(plant.harvestDate), plant._id))
            break;
          }
          case PlantType.Bush:
          {
            let tmp: Bush = new Bush(new DateRange(plant.harvestedPlant.sowingSeasonStart, plant.harvestedPlant.sowingSeasonEnd), new DateRange(plant.harvestedPlant.yieldSeasonStart, plant.harvestedPlant.yieldSeasonEnd), plant.harvestedPlant.expectedYieldInkg, plant.harvestedPlant.name, plant.harvestedPlant.image, plant.harvestedPlant.icon)
            tmp.id = plant._id
            retVal.push(new Harvest(plant.weight, tmp, new Date(plant.harvestDate), plant._id))
            break;
          }
          case PlantType.Tree:
          {
            let tmp: Tree = new Tree(new DateRange(plant.harvestedPlant.sowingSeasonStart, plant.harvestedPlant.sowingSeasonEnd), new DateRange(plant.harvestedPlant.yieldSeasonStart, plant.harvestedPlant.yieldSeasonEnd), plant.harvestedPlant.expectedYieldInkg, plant.harvestedPlant.name, plant.harvestedPlant.image, plant.harvestedPlant.icon)
            tmp.id = plant._id
            retVal.push(new Harvest(plant.weight, tmp, new Date(plant.harvestDate), plant._id))
            break;
          }
        }
        });
      }
    )
    return retVal
  }

  //SowedPlants
  public addSowedPlant(sowedPlant: SowedPlant): boolean
  {
    let tmp: boolean = false
    this.http.put<sowedPlantBackend>(this._sowPlantURL, sowedPlant.toJSON()).subscribe(
      res => {
        tmp = true;
      }
    )
    return tmp
  }

  public getSowedPlants(): SowedPlant[]
  {
    let retVal: SowedPlant[] = []
    this.http.get<Array<sowedPlantBackend>>(this._sowPlantURL).subscribe(
      res => {
        console.log(res)
        res.forEach(sowedPlant => {
          console.log(sowedPlant)
          let tmpPatch: GardenPatch = new GardenPatch(sowedPlant.gardenPatchID.name, sowedPlant.gardenPatchID.type, sowedPlant.gardenPatchID.amount, sowedPlant.gardenPatchID._id)
          switch(sowedPlant.plantID.type)
        {
          case PlantType.Plant:
          {
            let tmp: Plant = new Plant(new DateRange(sowedPlant.plantID.sowingSeasonStart, sowedPlant.plantID.sowingSeasonEnd), sowedPlant.plantID.minVegetationCycleInDays, sowedPlant.plantID.maxVegetationCycleInDays, sowedPlant.plantID.expectedYieldInkg, sowedPlant.plantID.name, sowedPlant.plantID.image, sowedPlant.plantID.icon)
            tmp.id = sowedPlant.plantID._id
            retVal.push(new SowedPlant(tmpPatch, tmp, new Date(sowedPlant.dateSowed), sowedPlant._id))
            break;
          }
          case PlantType.Bush:
          {
            let tmp: Bush = new Bush(new DateRange(sowedPlant.plantID.sowingSeasonStart, sowedPlant.plantID.sowingSeasonEnd), new DateRange(sowedPlant.plantID.yieldSeasonStart, sowedPlant.plantID.yieldSeasonEnd), sowedPlant.plantID.expectedYieldInkg, sowedPlant.plantID.name, sowedPlant.plantID.image, sowedPlant.plantID.icon)
            tmp.id = sowedPlant.plantID._id
            retVal.push(new SowedPlant(tmpPatch, tmp, new Date(sowedPlant.dateSowed), sowedPlant._id))
            break;
          }
          case PlantType.Tree:
          {
            let tmp: Tree = new Tree(new DateRange(sowedPlant.plantID.sowingSeasonStart, sowedPlant.plantID.sowingSeasonEnd), new DateRange(sowedPlant.plantID.yieldSeasonStart, sowedPlant.plantID.yieldSeasonEnd), sowedPlant.plantID.expectedYieldInkg, sowedPlant.plantID.name, sowedPlant.plantID.image, sowedPlant.plantID.icon)
            tmp.id = sowedPlant.plantID._id
            retVal.push(new SowedPlant(tmpPatch, tmp, new Date(sowedPlant.dateSowed), sowedPlant._id))
            break;
          }
        }
      }
    )})
    return retVal
  }
}
