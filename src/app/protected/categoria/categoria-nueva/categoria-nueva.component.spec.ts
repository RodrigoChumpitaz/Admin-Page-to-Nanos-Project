import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaNuevaComponent } from './categoria-nueva.component';

describe('CategoriaNuevaComponent', () => {
  let component: CategoriaNuevaComponent;
  let fixture: ComponentFixture<CategoriaNuevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaNuevaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
