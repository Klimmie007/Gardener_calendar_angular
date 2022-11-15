export class User
{
    
    private static emailRegex: RegExp = new RegExp(".+@.+\..{2,3}");
    private static count: number = 0;
    private email: string;
    private nickname: string;
    private password?: string;
    private id?: number;
    //private isConfirmed: boolean;
    constructor(email: string, nickname: string, password: string)
    {
        //this.isConfirmed = true;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }
    public LoginSuccessful(password: string) : boolean
    {
        if(password == null || this.password == null)
            return false;
        return password == this.password;
    }
    public get Email(): string
    {
        return this.email;
    }
    public toJSON(): Object
    {
        return {email: this.Email, nickname: this.nickname, password: this.password}
    }
}