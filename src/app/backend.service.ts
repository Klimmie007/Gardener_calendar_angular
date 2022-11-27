import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
//import { Preserve } from '../app/_models/preserve';
import { DateRange, IPlant, PlantType } from './_models/plantInterface';
import { isNgTemplate } from '@angular/compiler';
import { Plant } from './_models/plant';
import { Bush } from './_models/bush';
import { Tree } from './_models/tree';

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

interface GardenPatch {
  name: string;
  type: string;
  amount: number;
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

  public getGardenPatches(): Observable<Array<GardenPatch>> {
    return this.http.get<Array<GardenPatch>>(this._gardenPatchesURL);
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
}
