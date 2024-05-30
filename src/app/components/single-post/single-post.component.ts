import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, Comment } from '../../data';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
}) 
export class SinglePostComponent implements OnInit,OnDestroy{
    constructor(private route: ActivatedRoute,private p: PostService,private c: CommentService,public router:Router){}
    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          this.id = params.get("postId");
          this.getPostData(this.id);
          this.getPostComments(this.id);
        }); 
        this.subscription = this.c.refresh$.subscribe(()=>{
          this.getPostComments(this.id);
        })
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    id: string | null; 
    
    post: Post = {
      id: undefined,
      user_id: undefined,
      title:  undefined,
      body: undefined
    }
    comments: Comment[] = [];
    subscription: Subscription;
    newComment = new FormGroup({
      body: new FormControl('')
    });

    getPostData(id){
      this.p.getPostData(Number(id)).subscribe((postData:Post)=>{
        this.post = postData;
      });
    }
    getPostComments(id){
      this.c.getComments().subscribe((postComments:Comment[])=>{
        this.comments = postComments.filter((c)=> c.post_id === Number(id));
      })
    }
    saveData(id){
      this.c.saveCommentData(this.newComment.value,id).subscribe((result) =>{
        console.log(result);
      });
      this.newComment.reset();
    }
    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  }
}
