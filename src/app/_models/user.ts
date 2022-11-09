
import * as bcrypt from "bcrypt"
export class User
{
    
    private static emailRegex: RegExp = new RegExp(".+@.+\..{2,3}");
    private static count: number = 0;
    private email: string;
    private nickname: string;
    private password? : string;
    private hashedPassword?: string;
    private id?: number;
    private isConfirmed: boolean;
    constructor(email: string, nickname: string, password: string)
    {
        
        this.isConfirmed = true;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.hashedPassword = bcrypt.hashSync(password, 10);
    }
    public get LoginSuccessful() : boolean
    {
        if(this.password == null || this.hashedPassword == null)
            return false;
        return bcrypt.compareSync(this.password, this.hashedPassword);
    }
}