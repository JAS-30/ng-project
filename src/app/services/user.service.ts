import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../data';
import { LocalStorageService } from './local-storage.service';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private local: LocalStorageService) { }
  url = "https://gorest.co.in/public/v2/users";
  token: string = this.local.getItem("token");
  bearer = "Bearer "+ this.token;
  httpHeader = {
    headers: new HttpHeaders({
      'Authorization': this.bearer
    })
  }
  users: User[];
  private _refresh$ = new Subject<void>();
  
  get refresh$(){
    return this._refresh$;
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url, this.httpHeader);
} 
getUserData(id: number):Observable<User>{
  return this.http.get<User>(this.url+"/"+id, this.httpHeader);
}; 
saveUserData(data){
  data.status = "inactive";
  return this.http.post(this.url, data,this.httpHeader).pipe(
    tap(()=>{
      this._refresh$.next();
    })
  )
}
deleteUser(id:number){
  return this.http.delete(this.url+"/"+id, this.httpHeader).pipe(
    tap(()=>{
      this._refresh$.next();
    })
  )
}

}
