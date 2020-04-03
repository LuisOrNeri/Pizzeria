import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPizzasComponent } from './all-pizzas.component';

describe('AllPizzasComponent', () => {
  let component: AllPizzasComponent;
  let fixture: ComponentFixture<AllPizzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPizzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPizzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
