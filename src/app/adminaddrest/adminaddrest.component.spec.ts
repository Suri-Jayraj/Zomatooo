import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddrestComponent } from './adminaddrest.component';

describe('AdminaddrestComponent', () => {
  let component: AdminaddrestComponent;
  let fixture: ComponentFixture<AdminaddrestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminaddrestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminaddrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
