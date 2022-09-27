type Adress = {
    addresstype: string,
    street1:string ,
    street2:string ,
    city: string,
    state:string ,
    zip: string 
}

export interface IUser {
    id : number,
    firstName : string,
    lastName : string,
    password : string,
    email : string,
    phone : string,
    sendCatalogue: boolean,
    receiveNotification : boolean,
    note : number,
    addresses:Adress[]
}

export class IUser {
    constructor(  
    ){}
  
}
