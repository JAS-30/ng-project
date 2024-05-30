import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../../data';
import { UserService } from '../../services/user.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpClient: HttpClient;
  let userService: UserService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [HttpClient,HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should be created',()=>{
    expect(component).toBeTruthy();
  })
  it('should toggle the settings button',()=>{
    expect(component.isHidden).toBe(true);
    component.settings();
    expect(component.isHidden).toBe(false);
  });
  it('should toggle the add User form',()=>{
    expect(component.newUserHidden).toBe(true);
    component.addUser();
    expect(component.newUserHidden).toBe(false);
  })
  
});
