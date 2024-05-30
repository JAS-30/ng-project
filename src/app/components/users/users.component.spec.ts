import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../../data';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [HttpClient,HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get text from search bar',()=>{
    let text:string;
    expect(component.getQuery(text)).toEqual(text);
})
it('should search for a user',()=>{
  let user:User={
    id: 0,
    name: '',
    email: '',
    gender: '',
    status: ''
  };
  let query:string;
  expect(component.userSearch(query)).toEqual(user.name || user.email || undefined);
})
});
