import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachedFilesComponent } from './attached-files.component';

describe('AttachedFilesComponent', () => {
  let component: AttachedFilesComponent;
  let fixture: ComponentFixture<AttachedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachedFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
