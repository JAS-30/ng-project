import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Post } from '../../data';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [HttpClient,HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents(); 
    
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should be created',()=>{
    expect(component).toBeTruthy();
  })
  it('should get text from search bar',()=>{
      let text:string;
      expect(component.getQuery(text)).toEqual(text);
  })
  it('should search for a post',()=>{
    let post:Post={
      id: 0,
      user_id: 0,
      title: '',
      body: ''
    };
    let query:string;
    expect(component.postSearch(query)).toEqual(post.id || undefined);
  })
});
