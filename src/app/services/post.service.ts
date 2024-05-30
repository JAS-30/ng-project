import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../data';
import { LocalStorageService } from './local-storage.service';
import { Observable, Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private local:LocalStorageService) { }
  url = "https://gorest.co.in/public/v2/posts";
  posts: Post[];
  token: string = this.local.getItem("token");
  bearer = "Bearer "+ this.token;
  httpHeader = {
    headers: new HttpHeaders({
      'Authorization': this.bearer
    })
  }
  private _refresh$ = new Subject<void>();
  
  get refresh$(){
    return this._refresh$;
  }

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.url,this.httpHeader);
} 
  getPostData(id: number):Observable<Post>{
    return this.http.get<Post>(this.url+"/"+id, this.httpHeader);
};
  savePostData(data,id){
    data.user_id = id;
    return this.http.post(this.url, data,this.httpHeader).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
} 

}
