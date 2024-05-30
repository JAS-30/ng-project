import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import { User } from '../data';
describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });
  it('should be created',()=>{
    expect(service).toBeTruthy();
  })
  it('should get users',()=>{
    let users:User[];
    service.getUsers().subscribe((res)=>{
        expect(res).toEqual(users);
  })
})
  it('should get the data of a user',()=>{
    let user:User;
    let id:number;
    service.getUserData(id).subscribe((res)=>{
      expect(res).toEqual(user);
    })
  })
  it('should create a user',()=>{

    let user ={
      name: '',
      email: '',
      gender: '',
      status: 'inactive'
    }
    service.saveUserData(user).subscribe((userData)=>{
      expect(userData).toEqual(user);
    })
    const req = httpController.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toBe(user);
  })
    it('should delete a user',()=>{
    const res = {};
    const userId:number = 0;
    service.deleteUser(userId).subscribe((data)=>{
      expect(data).toEqual(res);
    })
    const req = httpController.expectOne(`https://gorest.co.in/public/v2/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
  })

  })
