import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserComponent } from './single-user.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SingleUserComponent', () => {
  let component: SingleUserComponent;
  let fixture: ComponentFixture<SingleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleUserComponent],
      imports: [RouterTestingModule],
      providers: [HttpClient,HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle the add post form',()=>{
    expect(component.isHidden).toBe(true);
    component.addPost();
    expect(component.isHidden).toBe(false);
  })
});
