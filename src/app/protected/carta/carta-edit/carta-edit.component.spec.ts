import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaEditComponent } from './carta-edit.component';

describe('CartaEditComponent', () => {
  let component: CartaEditComponent;
  let fixture: ComponentFixture<CartaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
