import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_API_URL = 'api/users'

  private enableToConnect : boolean = false ;
  constructor(private http: HttpClient, private router : Router) { }


  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.USER_API_URL}`).pipe(
      catchError(this.handleError)
    )
  }

  getUserById(user: IUser): Observable<IUser> {
    return this.http.get<IUser>(`${this.USER_API_URL}/${user.id}`).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.USER_API_URL}/${user.id}`, user)
  }

  delete(user: IUser): Observable<{}> {
    return this.http.delete<{}>(`${this.USER_API_URL}/${user.id}`)
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.USER_API_URL}`, user)
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage!: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      errorMessage = `An error occured: ${error.error.message}`
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      errorMessage = `Backend returned code ${error.status},` +
        ` body was: , ${error.error}`;

    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

 getEnableToConnecte(){
   return this.enableToConnect;
 }

 setEnableToConnecte(enableToConnect : boolean){
   this.enableToConnect = enableToConnect;
}

 login(enableToConnect : boolean): void{
  this.setEnableToConnecte(enableToConnect);
  this.router.navigateByUrl("hotels")
 }
}
