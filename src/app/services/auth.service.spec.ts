import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

describe('AuthService', () => {
  let service: AuthService;
  let local:LocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should auth login',()=>{
    const  token = local?.getItem("token");
    if(token=='token'){
      expect(service.isLoggedIn()).toBeTruthy();
    }else{
      expect(service.isLoggedIn()).toBeFalsy();
    }
  })
  
});
