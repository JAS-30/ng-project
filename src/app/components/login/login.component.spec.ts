import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let storage: LocalStorageService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


it('should be created',()=>{
  expect(component).toBeTruthy();
})
it("should set the user's token",()=>{
  let token:string;
  if(token==''||token==undefined){
    expect(component.isDisabled()).toBeTruthy();
  }else{
    expect(component.isDisabled()).toBeFalsy();
  }
  
})

});




