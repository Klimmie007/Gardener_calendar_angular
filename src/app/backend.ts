import { Injectable } from "@angular/core";
import { User } from "./_models/user";
@Injectable()
export class Backend {
    private static users: User[] = [];
    public AddUser(user: User)
    {
        Backend.users.push(user);
    }
    public get Users(): User[]
    {
        return Backend.users;
    }
}
