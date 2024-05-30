import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAvailableComponent } from './404.component';

describe('NotAvailableComponent', () => {
  let component: NotAvailableComponent;
  let fixture: ComponentFixture<NotAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotAvailableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created',()=>{
    expect(component).toBeTruthy();
  })
});
