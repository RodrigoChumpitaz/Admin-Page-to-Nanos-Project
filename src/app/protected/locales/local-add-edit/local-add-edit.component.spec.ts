import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAddEditComponent } from './local-add-edit.component';

describe('LocalAddEditComponent', () => {
  let component: LocalAddEditComponent;
  let fixture: ComponentFixture<LocalAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
