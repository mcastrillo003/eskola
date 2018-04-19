export class User {
  constructor(
    //_id atributua ere izango du, mongok berez sortzen duelako
    public _id:string,
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string
  ){}
}
