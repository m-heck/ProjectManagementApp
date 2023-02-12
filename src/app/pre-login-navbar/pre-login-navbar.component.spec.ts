import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoginNavbarComponent } from './pre-login-navbar.component';

describe('PreLoginNavbarComponent', () => {
  let component: PreLoginNavbarComponent;
  let fixture: ComponentFixture<PreLoginNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreLoginNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreLoginNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
