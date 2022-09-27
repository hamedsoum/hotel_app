import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api'
import { IUser } from '../models/user';

export class HotelData implements InMemoryDbService {
    createDb(reqInfo?: RequestInfo): Record<string , IUser[]> {
            const hotels : IUser[] = [
                {
                  id : 0,
                  firstName : "daouda",
                  lastName : "soro",
                  password : "SoroDoauda123@",
                   email :  "soro@gmail.com",
                   phone : "07872345454",
                   sendCatalogue : true,
                   receiveNotification : true,
                   note : 2,
                   addresses : [{
                        addresstype: "work",
                        street1:"street1" ,
                        street2:"street 2" ,
                        city: "street 2",
                        state:"state" ,
                        zip: "zip"    
                   }]   
              },
              {
                  id : 0,
                  firstName : "Hamed",
                  lastName : "Soumahoro",
                  password : "Hamed123#",
                   email :  "hamedsoum@gmail.com",
                   phone : "0787008315",
                   sendCatalogue : false,
                   receiveNotification : true,
                   note : 2,
                   addresses : [{
                        addresstype: "work",
                        street1:"street1" ,
                        street2:"street 2" ,
                        city: "street 2",
                        state:"state" ,
                        zip: "zip"    
                   }]   
              },
              
            ];

            return  { hotels };
    }

//     genId(hotels : IHotel[]) : number{
//       return hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id)) + 1 : 1;
//     }

//     genId(hotels: IHotel[]): number | null {
//       return hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id)) + 1 : 1;
//     }
}