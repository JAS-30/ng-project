import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Post } from '../data';

describe('PostService', () => {
  let service: PostService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostService);
    httpController = TestBed.inject(HttpTestingController);
  });
  it('should be created',()=>{
    expect(service).toBeTruthy();
  })
  it('should get posts',()=>{
    let posts:Post[];
    service.getPosts().subscribe((res)=>{
        expect(res).toEqual(posts);
    })
  })
  it('should get 1 post',()=>{
    let id:number;
    let post:Post;
    service.getPostData(id).subscribe((res)=>{
      expect(res).toEqual(post);
    })
  })
  it('should post data',()=>{
    let data={
      user_id: 0,
      title: 'test',
      body: 'test'
    }
    let userId=0;

    service.savePostData(data,userId).subscribe((postData)=>{
      expect(postData).toEqual(data);
    })
    const req = httpController.expectOne('https://gorest.co.in/public/v2/posts');
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(data);
  })
});
