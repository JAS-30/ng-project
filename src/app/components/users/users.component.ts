
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../data';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(private u: UserService){}
  ngOnInit(): void {
      this.getUsers();
      this.subscription = this.u.refresh$.subscribe(()=>{
        this.getUsers();
      }) 
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  users: User[]=[];
  subscription: Subscription;
  
  getUsers(){
    this.u.getUsers().subscribe(usersData=>{
      this.users = usersData;
    })
  }

  getQuery(text: string){
    return text;
  }
  userSearch(query: string): any{
  for(let i=0;i<this.users.length;i++){
    if(query==this.users[i].name || query==this.users[i].email){
        return this.users[i].id;
    }
  }
  return;
  }


}
