import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSignInPageComponent } from './team-sign-in-page.component';

describe('TeamSignInPageComponent', () => {
  let component: TeamSignInPageComponent;
  let fixture: ComponentFixture<TeamSignInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamSignInPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamSignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
