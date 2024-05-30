import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private local:LocalStorageService) { }
  isLoggedIn(){
    return this.local.getItem("token")!=null;
  }
}
