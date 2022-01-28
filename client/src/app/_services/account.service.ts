import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService 
{
  baseUrl = 'https://localhost:5001/api/';

  // This here creates a replaysubject? (Gotta learn more about this)
  // ReplaySubject = Buffer object, each time someone subscribs to this variable, it'll return the variables/values
  private currentUserSource = new ReplaySubject<User>(1);

  // This sets it as an observable so when the value changes, we can register and do something with it
  currentUser$ = this.currentUserSource.asObservable();



  constructor(private http: HttpClient) { }


  login(model: any) : Observable<void>
  {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: any) =>
      {
        const user = response;
        if(user)
        {
          localStorage.setItem('user',JSON.stringify(user));
          
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any)
  {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }

        return user;
      })
    );
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
  }


  setCurrentUser(user: User)
  {
    this.currentUserSource.next(user);
  }
}
