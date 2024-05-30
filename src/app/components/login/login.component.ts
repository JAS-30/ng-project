import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent { 
  text:string;

  constructor(private local: LocalStorageService){}
  
  isDisabled(){
    if(this.text == '' || this.text ==undefined){
      return true;
    }
    this.local.setItem("token",this.text);
    console.log(this.local.getItem("token"));
    return false;
  }
  
}
