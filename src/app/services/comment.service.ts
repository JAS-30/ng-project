import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../data';
import { LocalStorageService } from './local-storage.service';
import { Observable, Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  
  constructor(private http: HttpClient,private local:LocalStorageService) { }
  url = "https://gorest.co.in/public/v2/comments";
  comments: Comment[];
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

  getComments():Observable<Comment[]>{
      return this.http.get<Comment[]>(this.url,this.httpHeader);
  } 

  getPostComments(id:number){
    this.getComments().subscribe((commentsData:Comment[])=>{
      this.comments = commentsData;
    });
    const commentList = this.comments?.filter((c)=> c.post_id === id);
    return commentList;
}; 
saveCommentData(data,id){
  data.post_id = id;
  data.name = "You";
  data.email = "test.email@email";
  return this.http.post(this.url, data, this.httpHeader).pipe(
    tap(()=>{
      this._refresh$.next();
    }))
}
} 
