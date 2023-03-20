import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAddEditComponent } from './usuario-add-edit.component';

describe('UsuarioAddEditComponent', () => {
  let component: UsuarioAddEditComponent;
  let fixture: ComponentFixture<UsuarioAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
