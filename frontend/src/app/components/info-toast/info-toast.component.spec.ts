import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoToastComponent } from './info-toast.component';

describe('InfoToastComponent', () => {
  let component: InfoToastComponent;
  let fixture: ComponentFixture<InfoToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
