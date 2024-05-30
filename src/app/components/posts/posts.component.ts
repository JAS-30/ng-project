
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../data';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit,OnDestroy{
  ngOnInit(): void {
    this.getPosts();
    this.subscription = this.p.refresh$.subscribe(()=>{
      this.getPosts();
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  constructor(private p: PostService){}
  posts : Post[] | undefined = [];
  subscription: Subscription;

  getPosts(){ 
    this.p.getPosts().subscribe(postsData =>{
      this.posts = postsData;
  }) 
}
  getQuery(text:string){
    return text;
  }
    postSearch(query: string): any{
    for(let i=0;i<this.posts.length;i++){
      if(query==this.posts[i].title){
          return this.posts[i].id;
      }
    }
    return;
    }
}
