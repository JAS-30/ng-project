import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
    constructor(private u: UserService ,private local:LocalStorageService,public router:Router){}
    
    isHidden = true;
    newUserHidden = true;
    newUser = new FormGroup(
      {
        name: new FormControl(''),
        email: new FormControl(''),
        gender: new FormControl
      }
    ); 
    
    settings(){
      this.isHidden = !this.isHidden;
    }
    addUser(){
      this.newUserHidden = !this.newUserHidden;
    }

    saveData(){
      this.u.saveUserData(this.newUser.value).subscribe((result) =>{
        console.log(result);
      }); 
    }
    deleteToken(){
      this.local.removeItem("token");
    }
}
