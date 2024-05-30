import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, User } from '../../data';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css' 
})
export class SingleUserComponent implements OnInit,OnDestroy {
    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          this.id = params.get("id"); 
          this.getUserData(this.id);
          this.getUserPosts(this.id);
          })
          this.subscription = this.u.refresh$.subscribe(()=>{
            this.getUserPosts(this.id);
        });
        
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    constructor(private route: ActivatedRoute,private u: UserService, private p:PostService,public router:Router){}
    
    id: string | null;
    user: User|undefined={
      id:undefined,
      name:undefined,
      email:undefined,
      gender:undefined,
      status:undefined
    };
    posts: Post[]=[];
    isHidden = true;
    subscription: Subscription;
    newPost = new FormGroup({
      title: new FormControl(''),
      body: new FormControl('')
  }
  );


    addPost(){
      this.isHidden = !this.isHidden;
    }
    
    getUserData(id){
      this.u.getUserData(Number(id)).subscribe((userData:User)=>{
        this.user = userData;
      });
    }
    getUserPosts(id){
      this.p.getPosts().subscribe((list:Post[])=>{
        this.posts = list.filter((p)=>p.user_id === Number(id));
      })
      
    }
    saveData(id){
      this.p.savePostData(this.newPost.value,id).subscribe((result) =>{
        console.log(result);
      });
      this.newPost.reset();
      setTimeout( ()=>{ this.reloadCurrentRoute();},2000);
    }
    deleteUser(id){
        this.u.deleteUser(id).subscribe((result)=>{
          console.log(result);
        });
    }

    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  }

}
