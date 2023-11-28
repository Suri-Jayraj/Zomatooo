import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarantItemsComponent } from './restuarant-items.component';

describe('RestuarantItemsComponent', () => {
  let component: RestuarantItemsComponent;
  let fixture: ComponentFixture<RestuarantItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestuarantItemsComponent]
    });
    fixture = TestBed.createComponent(RestuarantItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
