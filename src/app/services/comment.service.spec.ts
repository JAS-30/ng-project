import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { Comment }from '../data';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('CommentService', () => {
  let service: CommentService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommentService);
    httpController = TestBed.inject(HttpTestingController);
  });
  it('should be created',()=>{
    expect(service).toBeTruthy();
  })
  it('should get comments',()=>{
      let list:Comment[];
      service.getComments().subscribe((res)=>{
          expect(res).toEqual(list);
      })
  })
  it('should get comments from a post',()=>{
    let id:number;
    let comments:Comment[];
    expect(service.getPostComments(id)).toEqual(comments||undefined);
  })
  it('should post comment',()=>{
    let data ={
      name: 'You',
      email: 'test.email@email',
      body: 'test-body'
    };
    let post_id=0;
    let comment ={
      post_id: 0,
      name: 'You',
      email: 'test.email@email',
      body: 'test-body'
    }
    service.saveCommentData(data,post_id).subscribe((commentData)=>{
      expect(commentData).toEqual(comment);
    })
    const req= httpController.expectOne('https://gorest.co.in/public/v2/comments');
  
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(comment);
  })
})

